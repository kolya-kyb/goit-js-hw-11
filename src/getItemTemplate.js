export function getItemTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  // return ` <img
  //           src="${webformatURL}"
  //           alt="${tags}"
  //           loading="lazy"
  //         />
  //         <div class="info">
  //           <p class="info-item">
  //             <b>Likes:</b> ${likes}
  //           </p>
  //           <p class="info-item">
  //             <b>Views:</b>${views}
  //           </p>
  //           <p class="info-item">
  //             <b>Comments:</b>${comments}
  //           </p>
  //           <p class="info-item">
  //             <b>Downloads:</b>${downloads}
  //           </p>
  //         </div>
  //       `;

  return `
  <li class="photo-card"><a href="${largeImageURL}" class="link"><div  ><img
  src="${webformatURL}"
  alt="${tags}"

 
/>
<div class="info">
  <p class="info-item">
    <b>Likes:</b> ${likes}
  </p>
  <p class="info-item">
    <b>Views:</b>${views}
  </p>
  <p class="info-item">
    <b>Comments:</b>${comments}
  </p>
  <p class="info-item">
    <b>Downloads:</b>${downloads}
  </p>
</div></div>
  </a></li>
   
`;
}
