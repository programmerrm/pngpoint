import os
import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)

ALLOWED_VARIANTS = ['public',]


def UPLOAD_IMAGE_TO_CLOUDFLARE(image_file):
    original_filename = getattr(image_file, "name", "upload.png")

    _, ext = os.path.splitext(original_filename)
    if ext.lower() != ".png":
        raise ValueError("Only .png images are allowed")

    url = f"https://api.cloudflare.com/client/v4/accounts/{settings.CLOUDFLARE_ACCOUNT_ID}/images/v1"
    headers = {
        "Authorization": f"Bearer {settings.CLOUDFLARE_API_TOKEN}"
    }

    files = {"file": (original_filename, image_file)}
    response = requests.post(url, headers=headers, files=files)

    response.raise_for_status()
    return response.json()["result"]["id"]

def GET_IMAGE_URL_FROM_CLOUDFLARE(image_id, variant="public"):
    if variant not in ALLOWED_VARIANTS:
        variant = "public"
    return f"https://{settings.CLOUDFLARE_IMAGES_DOMAIN}/{settings.CLOUDFLARE_ACCOUNT_HASH}/{image_id}/{variant}"

def SINGLE_IMAGE_DELETE_FROM_CLOUDFLARE(image_id):
    account_id = settings.CLOUDFLARE_ACCOUNT_ID
    api_token = settings.CLOUDFLARE_API_TOKEN
    url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/{image_id}"

    headers = {
        "Authorization": f"Bearer {api_token}"
    }

    try:
        response = requests.delete(url, headers=headers)
        response.raise_for_status()

        result = response.json()
        if result.get("success"):
            return {"success": True}
        else:
            return {"success": False, "error": result.get("errors", [])}
    except Exception as e:
        return {"success": False, "error": str(e)}

def NUMBER_OF_IMAGE_DELETE_FROM_CLOUDFLARE(image_id):
    account_id = settings.CLOUDFLARE_ACCOUNT_ID
    api_token = settings.CLOUDFLARE_API_TOKEN

    url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/{image_id}"
    headers = {
        "Authorization": f"Bearer {api_token}"
    }

    try:
        response = requests.delete(url, headers=headers, timeout=10)  # timeout added
        response.raise_for_status()

        result = response.json()
        if result.get("success"):
            return {"success": True}
        else:
            error_list = result.get("errors", [])
            error_msg = "; ".join([err.get("message", str(err)) for err in error_list])
            return {"success": False, "error": error_msg}

    except requests.exceptions.RequestException as e:
        return {"success": False, "error": f"Request error: {str(e)}"}
    except Exception as e:
        return {"success": False, "error": f"Unexpected error: {str(e)}"}



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
