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

// Selectarea tag-ului ul
const galleryList = document.querySelector('.gallery');

// Crearea unei functii ce are ca si scop alocarea tag-urilor/ claselor/ content-ului pentru elementul listei
function galleryElementCreation(item) {
  // Creare tag-uri HTML (li,a,img)
  const galleryItem = document.createElement('li');
  const galleryLink = document.createElement('a');
  const galleryImage = document.createElement('img');
  // Creare clase CSS (.gallery__item,.gallery__image,.gallery__link)
  galleryItem.classList.add('gallery__item');
  galleryLink.classList.add('gallery__link');
  galleryImage.classList.add('gallery__image');
  // Crearea Atributelor tag-urilor
  galleryLink.href = item.original; // link-ul catre dimensiunea originala a imaginii (regasita in gallery-items.js)
  galleryImage.src = item.preview; // imaginea de thumbnail (regasita in gallery-items.js)
  galleryImage.alt = item.description; // textul afisat daca nu se incarca iamginea (regasit in gallery-items.js)
  galleryImage.dataset.source = item.original; // Salvare url-ului imaginii originale in atributul data-src al tag-ului img, link-ul ramane invizibil pt browser pana va fi accesat in fereastra modala (este o modalitate de stocare a link-ului)
  // Crearea ierarhiei parinte-copil-descendent (li->a->img sau galleryItem->galleryLink->galleryImage)
  galleryItem.appendChild(galleryLink);
  galleryLink.appendChild(galleryImage);
  // Returnarea elementului final li
  return galleryItem;
}

// Crearea unei bucle care sa itereze prin fiecare element al array-ului 'galleryItems' din fisierul gallery-items.js
galleryItems.forEach(item => {
  // ^ Alegem array-ul 'galleryItems' din fisierul gallery-items.js, folosim 'forEach' ca sa iteram prin fiecare element al array-ului, dam un nume pt fiecare element al array-ului: 'item'.
  const galleryItem = galleryElementCreation(item);
  // ^ Cream o constanta cu rolul de a stoca elementul li obtinut prin apelarea functiei creata anterior
  galleryList.appendChild(galleryItem);
  // ^ Realizam ierarhia Parinte-Copil intre elementul ul si li (sau galleryList si galleryItem)
});

// Delegarea evenimentului on click si crearea ferestrei modale
galleryList.addEventListener('click', (clickEvent) => {
  // ^ Delegarea evenimentului se face la nivelul ul pt a evita declararea evenimentului pt fiecare li
  clickEvent.preventDefault(); // anulam actiunea ce sar fi intamplat by default la accesarea link-ului

  if (clickEvent.target.nodeName === 'IMG') {
    // ^ clickEvent.target : obiectul din DOM care a declansat evenimentul de click
    // ^ clickEvent.target.nodeName : pentru a obtine numele tag-ului HTML ce a declansat evenimentul de click ("IMG")
    const imageUrl = clickEvent.target.dataset.source; // colectam imaginea originala din atributul data-src al tag-ului img
    
    // In continuare folosim bibloteca "basicLightbox" pentru a crea fereastra modala
    // basicLightbox.create - o metoda a librariei "basicLightbox" ce primeste ca argument un sir de caracte care contine marcajul HTML al continutului ferestrei modale
    // realizam inchiderea feerestrei modale la apasarea tastei Escape
    // metoda show() afiseaza fereastra modala 'instace' creata cu ajutorul librariei basicLightbox
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



