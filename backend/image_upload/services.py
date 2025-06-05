import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

ALLOWED_VARIANTS = ['public',]

def UPLOAD_IMAGE_TO_CLOUDFLARE(image_file):
    url = f"https://api.cloudflare.com/client/v4/accounts/{settings.CLOUDFLARE_ACCOUNT_ID}/images/v1"
    headers = {
        "Authorization": f"Bearer {settings.CLOUDFLARE_API_TOKEN}"
    }

    with image_file.open("rb") as file:
        files = {"file": (image_file.name, file)}
        response = requests.post(url, headers=headers, files=files)

    response.raise_for_status()
    return response.json()["result"]["id"]

def GET_IMAGE_URL_FROM_CLOUDFLARE(image_id, variant="public"):
    if variant not in ALLOWED_VARIANTS:
        variant = "public"
    return f"https://{settings.CLOUDFLARE_IMAGES_DOMAIN}/{settings.CLOUDFLARE_ACCOUNT_HASH}/{image_id}/{variant}"

def DELETE_IMAGES_FROM_CLOUDFLARE(images_id):
    pass

def DELETE_ALL_IMAGE_FROM_CLOUDFLARE():
    account_id = settings.CLOUDFLARE_ACCOUNT_ID
    api_token = settings.CLOUDFLARE_API_TOKEN
    base_url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1"
    headers = {
        "Authorization": f"Bearer {api_token}"
    }

    try:
        response = requests.get(base_url, headers=headers)
        response.raise_for_status()
        images_data = response.json()

        if not images_data.get("success"):
            return {"success": False, "error": "Could not fetch images from Cloudflare."}

        deleted = []
        failed = []

        for image in images_data["result"]["images"]:
            image_id = image["id"]
            delete_url = f"{base_url}/{image_id}"
            try:
                del_res = requests.delete(delete_url, headers=headers)
                del_res.raise_for_status()
                deleted.append(image_id)
            except Exception as e:
                failed.append({"image_id": image_id, "error": str(e)})

        return {
            "success": True,
            "deleted": deleted,
            "failed": failed
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

