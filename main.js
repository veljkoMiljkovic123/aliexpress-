let mainRow = document.querySelector("#main-row");
let modalBody = document.querySelector(".modal-body");

API.getAll().then(function (data) {
  makePage(data);
});

function makePage(data) {
  console.log(data);
  let html = "";
  data.forEach((product) => {
    html += `<div class="col-3 mt-4">
                        <div class="card">
                            <div class="card-header d-flex justify-content-between">
                                <span class="badge badge-sm bg-secondary">${
                                  product.brand
                                }</span>
                                <span class="badge badge-sm bg-danger">${
                                  product.price
                                }$</span>
                            </div>
                            <div class="card-body">
                                <img src=${product.thumbnail}
                                style{height:'200px'}  class="img-fluid">
                            </div>
                            <div class="card-footer">
                                <h5>${product.title.substring(0, 12)}</h5>
                                <button data-id=${
                                  product.id
                                } class="btn btn-sm btn-info form- infoBtns">View more</button>
                            </div>
                        </div>
                    </div>`;
  });
  mainRow.innerHTML = html;

  let infoBtns = document.querySelectorAll(".infoBtns");
  infoBtns.forEach((btn) => btn.addEventListener("click", showInfo));
}

function showInfo(e) {
  let id = this.getAttribute("data-id");
  const myModal = new bootstrap.Modal("#one");

  API.getOne(id).then(function (product) {
    modalBody.innerHTML = product.title;
    modalBody.innerHTML += `<img src=${product.thumbnail} style`;
    modalBody.innerHTML += product.price;
    myModal.show();
  });
}
