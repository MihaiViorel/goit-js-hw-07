/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cerinta Exercitiul 2:

// Creați aceeași galerie ca în prima sarcină, folosind librăria SimpleLightbox, care se va ocupa de procesarea click - urilor pe imagini, de deschiderea și închiderea unei ferestre modale și de listarea imaginilor, folosind tastatura.Puteți urmări filmulețul demonstrativ al galeriei cu biblioteca conectată.

// Modificați puțin aspectul cardului de galerie, folosind acest șablon.
// <li class="gallery__item">
//    <a class="gallery__link" href="large-image.jpg">
//       <img class="gallery__image" src="small-image.jpg" alt="Image description" />
//    </a>
// </li >
  
// Îndepliniți acest task în fișierele 02 - lightbox.html și 02 - lightbox.js.Împărțiți - l în mai multe subtask - uri:

// - Crearea și randarea unui marcaj pe baza datelor din matricea de date galleryItems și a șablonului de articol furnizat din galerie. Refolosiți codul scris din primul exercițiu.
// - Conectarea scriptului și a stilurilor librăriei, CDN service cdnjs. Adăugați link-urile pentru fișierele: simple-lightbox.min.js și simple-lightbox.min.css.
// - Inițializarea librăriei după ce elementele galeriei sunt create și adăugate în ul.gallery. Pentru a face acest lucru, citiți documentația SimpleLightbox, secțiunile "Usage" și "Markup".
// - Căutați în documentație secțiunea "Options" și adăugați un text sugestiv imaginei în atributul alt. Textul alternativ va fi poziționat în partea de jos și va apărea la 250 de milisecunde după deschiderea imaginii.

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

gallery.addEventListener("click", (clickEvent) => {
  clickEvent.preventDefault();
  lightbox.open();
});

document.addEventListener('keydown', (escEvent) => {
  if (escEvent.key === 'Escape' && lightbox.isOpen) {
    lightbox.close();
  }
});