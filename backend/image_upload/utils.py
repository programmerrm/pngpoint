from PIL import Image
from PIL.ExifTags import TAGS
import os

def extract_metadata(file):
    image = Image.open(file)
    exif_data = image.getexif()
    metadata = {
        "filename": file.name,
        "width": image.width,
        "height": image.height,
        "size": os.path.getsize(file),
        "format": image.format,
        "title": "",
        "tags": [],
        "categories": [],
        "keywords": []
    }

    for tag_id, value in exif_data.items():
        tag = TAGS.get(tag_id, tag_id)
        if tag.lower() == "imageDescription".lower():
            metadata["title"] = value
        if tag.lower() == "XPKeywords".lower():
            keywords = value.decode('utf-16-le').split(';')
            metadata["keywords"] = [k.strip() for k in keywords if k.strip()]
        if tag.lower() == "XPSubject".lower():
            metadata["tags"] = value.decode('utf-16-le').split(';')
        if tag.lower() == "XPTitle".lower():
            metadata["categories"] = value.decode('utf-16-le').split(';')

    return metadata


STATUS = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
]