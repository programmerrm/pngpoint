from celery import group
from tasks.upload_images_task import upload_images
from images.utils.split_list import SPLIT_LIST

def TRIGGER_UPLOAD_IMAGES(user_id, image_data_list, chunk_size=50):
    task_group = group(
        upload_images.s(user_id, chunk)
        for chunk in SPLIT_LIST(image_data_list, chunk_size)
    )
    task_group()
