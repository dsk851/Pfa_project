import requests
from bs4 import BeautifulSoup
import os

# URL de la page Pexels
url = "https://www.pexels.com/fr-fr/chercher/voiture/"

# En-tête pour éviter d'être bloqué
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# Créer un dossier pour les images
if not os.path.exists('images'):
    os.makedirs('images')

# Récupérer la page
try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Vérifie si la requête a réussi
    soup = BeautifulSoup(response.text, 'html.parser')
except requests.exceptions.RequestException as e:
    print(f"Erreur lors de la récupération de la page : {e}")
    exit()
    # Vérifier si l'accès au site est interdit
    if response.status_code == 403:
        print("Accès interdit au site. Veuillez vérifier les en-têtes ou utiliser une autre méthode.")
        exit()
# Trouver les liens des images
image_links = []
import time

for img in soup.find_all('img'):
    if img.get('src'):
        image_links.append(img['src'])

for link in image_links:
    filename = link.split('/')[-1]
    try:
        response = requests.get(link, headers=headers, timeout=10)
        response.raise_for_status()  # Vérifie si la requête a réussi
        with open(f'images/{filename}', 'wb') as file:
            file.write(response.content)
        print(f"Téléchargement de {filename} réussi.")
        time.sleep(1)  # Ajouter un délai pour éviter d'être bloqué
    except requests.exceptions.RequestException as e:
        print(f"Erreur lors du téléchargement de {link} : {e}")
