/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cerinta Exercitiul 1:

// Creați o galerie, cu posibilitatea de a da click pe elementele sale și de a vizualiza imaginea la dimensiune completă, într - o ereastră modală.Urmăriți filmulețul demonstrativ al galeriei.

// Îndepliniți acest task în fișierele 01-gallery.html și 01-gallery.js. Împărțiți-l în mai multe subtask-uri:
//   - Crearea și randarea unui marcaj pe baza datelor din matricea de date galleryItems și a șablonului de articol furnizat din alerie.
//   - Delegarea la ul.gallery și obținerea unui url a imaginii mari.
//   -Conectarea scriptului și a stilurilor din librăria ferestrei modale basicLightbox. Folosiți CDN service jsdelivr și adăugați în roiect link-urile fișierelor minimizate (.min) de la librăria folosită.
//   - Deschiderea unei ferestre modale printr-un click pe un element al galeriei. Pentru a face acest lucru, citiți documentația și xemple deja implementate.
//   - Înlocuirea valorii atributului src al elementului < img > în fereastra modală înainte deschiderii.Utilizați marcajul deja xistent pentru fereastra modală din exemplele librăriei basicLightbox.

// Link-ul către imaginea originală va fi stocat în data - attribute source pe elementul < img > și specificat în href.Nu adăugați alte ag-uri HTML sau clase CSS, altele decât cele din acest șablon.
// Fiți atent la faptul că imaginea este înfășurată într - un link, ceea ce înseamnă că atunci când dați click, utilizatorul va fi edirecționat implicit către o altă pagină.Dezactivați acest comportament.
// Această funcționalitate nu este necesară la predarea temei, dar va fi o practică suplimentară utilă.:
//   La apăsarea tastei Escape, ferestra modală se va închide. Acest lucru trebuie să se întâmple doar atunci când fereastra modală ste deschisă. Librăria basicLightbox are o metodă de a închide în mod programat o fereastră modală.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

function galleryElementCreation(item) {
  const galleryItem = document.createElement('li');
  const galleryLink = document.createElement('a');
  const galleryImage = document.createElement('img');
  galleryItem.classList.add('gallery__item');
  galleryLink.classList.add('gallery__link');
  galleryImage.classList.add('gallery__image');
  galleryLink.href = item.original;
  galleryImage.src = item.preview;
  galleryImage.alt = item.description;
  galleryImage.dataset.source = item.original; 
  galleryItem.appendChild(galleryLink);
  galleryLink.appendChild(galleryImage);
  return galleryItem;
}

galleryItems.forEach(item => {
  const galleryItem = galleryElementCreation(item);
  galleryList.appendChild(galleryItem);
});

galleryList.addEventListener('click', (clickEvent) => {
  clickEvent.preventDefault();

  if (clickEvent.target.nodeName === 'IMG') {
    const imageUrl = clickEvent.target.dataset.source;
    const instance = basicLightbox.create(`
      <img src="${imageUrl}" width="800" height="600">
    `);

    document.addEventListener('keydown', (escEvent) => {
    if (escEvent.key === "Escape") {
        instance.close();
      };
    });
    
    instance.show();
  }
  
});



