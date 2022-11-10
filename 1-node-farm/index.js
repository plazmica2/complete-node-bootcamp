const fs = require('fs');
const http = require('http');
const url=require('url');

//////////////////////////////////////
//// FILES
// //Blocking, synchronous way
// //Reading from the system file
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn)

// //Save the content into a var - this called sync way
// //Each statement processed line by line 
// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
// //Writing to the system file
// fs.writeFileSync('./starter/txt/input.txt', textOut) 
// console.log('File written!');
 
// Non-blocking, asynchronous way
// fs.readFile('./starter/txt/start.txt' ,'utf-8', (err, data1) =>  {
//     if(err) return console.log('ERROR!');
//     fs.readFile(`./starter/txt/${data1}.txt` ,'utf-8', (err, data2) =>  {
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt' ,'utf-8', (err, data3) =>  {
//             console.log(data3);

//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written');
//             })
//         })
//     })
    
// });

// console.log('Will read file!');

//////////////////////////////////////
//// SERVER
const replaceTemplate = (temp, product) => {
    // temp is the html strucure
    //products is a list of products
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output=output.replace(/{%IMAGE%}/g, product.image);
    output=output.replace(/{%PRICE%}/g, product.price);
    output=output.replace(/{%FROM%}/g, product.from);
    output=output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output=output.replace(/{%QUANTITY%}/g, product.quantity);
    output=output.replace(/{%DESCRIPTION%}/g, product.description);
    output=output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output; 
}

const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
   


const server = http.createServer((req, res) => {
    
    
    const { query, pathname } = url.parse(req.url, true);
    //const pathName = req.url;

    // Overview page 
    if(pathname === '/' || pathname==='/overview') {
        res.writeHead(200, { 'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    // Product page
    else if (pathname==='/product') {

        res.writeHead(200, { 'Content-type': 'text/html'}); 
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        console.log(output)
        res.end(output);

    }
    // Api
    else if (pathname==='/api') {
        // fs.readFile(`${__dirname}/starter/dev-data/data.json`, 'utf-8', (err, data) => {
        // const productData = JSON.parse(data);
            res.writeHead(200, { 'Content-type': 'application/json'}); 
            res.end(data);
        // });
    } 
    // Not found
    else {
        res.writeHead(404, {
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        })
        res.end('Error');
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to request on port 8000')
});
