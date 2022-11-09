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

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
   


const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === '/' || pathName==='/overview') {
        res.end('This is the overview');
    }
    else if (pathName==='/product') {
        res.end('This is the product');
    }
    else if (pathName==='/api') {
        // fs.readFile(`${__dirname}/starter/dev-data/data.json`, 'utf-8', (err, data) => {
        // const productData = JSON.parse(data);
            res.writeHead(200, { 'Content-type': 'application/json'}); 
            res.end(data);
        // });
    }
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
