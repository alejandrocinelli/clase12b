const socket = io();
//console.log("desde el cliente");
const productForm = document.getElementById("productForm");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productThumbnail = document.getElementById("imgUrl");
const productList = document.getElementById("productPool");
const deleteAll = document.getElementById("deleteAll");
const deleteOne = document.getElementById("deleteOne");

// envia el mensaje

const sendProduct = (producInfo) => {
    socket.emit("new-product", producInfo);
    //console.log("enviando producto");
    };

    const renderProduct = (product) => { 

        
        const html = product.map ((prod) => {
            return (`
           
            <tr class="text-center">
            <td>${prod.id}</td>
            <td>${prod.title}</td>
            <td>${prod.price}</td>
            <td><img src="${prod.thumbnail}" alt="producto" width="50px"></td>
            <td><button id="deleteOne" value=${prod.id} class="btn btn-danger btn-sm">x</button></td>
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

    // boton para borrar todos los productos

    const handlerDeleteAll = (e) => {
        e.preventDefault();
        // socket.emit("delete-all");
        console.log("borrando todos los productos");
        socket.emit("delete-all");
        
    }

    deleteAll.addEventListener("click", handlerDeleteAll);
    
    // boton para borrar un producto
    const handlerDeleteOne = (e) => {
        e.preventDefault();
        const id = e.target.value;
        console.log("borrando un producto"+id);
       // socket.emit("delete-one");
    }
    
  deleteOne.addEventListener("click", handlerDeleteOne);
