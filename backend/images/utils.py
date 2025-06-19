import hashlib

def GET_IMAGE_HASH(image_file):
    hash_md5 = hashlib.md5()
    for chunk in image_file.chunks():
        hash_md5.update(chunk)
    return hash_md5.hexdigest()

STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
]

# CATEGORIES = [
#     ('Animals', 'Animals'),
#     ('Buildings and Architecture', 'Buildings and Architecture')
#     ('Business', 'Business'),
#     ('Drinks', 'Drinks'),
#     ('The Environment', 'The Environment'),
#     ('States of Mind', 'States of Mind'),
#     ('Food', 'Food'),
#     ('Graphic Resources', 'Graphic Resources'),
#     ('Hobbies and Leisure', 'Hobbies and Leisure'),
#     ('Industry', 'Industry'),
#     ('Landscape', 'Landscape'),
#     ('Lifestyle', 'Lifestyle'),
#     ('People', 'People'),
#     ('Plants and Flowers', 'Plants and Flowers'),
#     ('Culture and Religion', 'Culture and Religion'),
#     ('Science', 'Science'),
#     ('Social Issues', 'Social Issues'),
#     ('Sports', 'Sports'),
#     ('Technology', 'Technology'),
#     ('Transport', 'Transport'),
# ]
