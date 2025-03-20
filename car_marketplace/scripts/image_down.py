import os
import requests
from bs4 import BeautifulSoup

def download_images(query, num_images, save_folder):
    if not os.path.exists(save_folder):
        os.makedirs(save_folder)

    search_url = f"https://www.google.com/search?q={query}&tbm=isch&tbs=isz:l"  # 'isz:l' filter for large images
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}

    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    images = []
    for img in soup.find_all('img', limit=num_images*2):
        if 'src' in img.attrs:
            images.append(img)
        if len(images) >= num_images:
            break

    for i, img in enumerate(images):
        img_url = img['src']
        try:
            img_data = requests.get(img_url).content
            with open(os.path.join(save_folder, f'car_{i+1}.jpg'), 'wb') as handler:
                handler.write(img_data)
            print(f"Image {i+1} downloaded successfully")
        except Exception as e:
            print(f"Could not download image {i+1}: {e}")

if __name__ == "__main__":
    query = "high quality car"
    num_images = int(input("Enter the number of car images to download: "))
    save_folder = "downloaded_car_images"
    download_images(query, num_images, save_folder)