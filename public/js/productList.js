const socket = io();
//console.log("desde el cliente");
const productForm = document.getElementById("productForm");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productThumbnail = document.getElementById("imgUrl");
const productList = document.getElementById("productPool");

// envia el mensaje

const sendProduct = (producInfo) => {
    socket.emit("new-product", producInfo);
    //console.log("enviando producto");
    };

    const renderProduct = (product) => { 

        
        const html = product.map ((prod) => {
            return (`
           
            <tr class="text-center">
            <td>${prod.title}</td>
            <td>${prod.price}</td>
            <td><img src="${prod.thumbnail}" alt="producto" width="50px"></td>
            </tr>
           
            `);
        });

    productList.innerHTML = html.join("");

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const producInfo = {
            title: productName.value,
            price: productPrice.value,
            thumbnail: productThumbnail.value,
        };
        sendProduct(producInfo);
        productForm.reset();
    }

    productForm.addEventListener("submit", submitHandler);

    socket.on("server:product",renderProduct)