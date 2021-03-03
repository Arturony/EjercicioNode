const fs = require('fs');
const axios = require('axios').default;
const http = require('http');

async function getProveedores() {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
      return response.data;
    } 
    catch (error) 
    {
      console.error(error);
    }
}

async function getClientes() {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
      return response.data;
    } 
    catch (error) 
    {
      console.error(error);
    }
}

http.createServer(function(req, res)
{
    var position = 519;
    var file_path = "original.html";
    if(req.url == "/api/proveedores")
    {
        fs.copyFile(file_path, "proveedores.html", (err) => {
            if (err) throw err;
            fs.readFile(file_path, function read(err, data)
            {
            if (err) throw err;
            GetData();
            async function GetData()
            {
            var resp = await axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json');
            var provJson = resp.data;
            var provHtml = '<h2> Listado de Proveedores </h2>' 
            + '<div class="card"> <table class="table table-striped">' +
            '<thead> <tr>'+
            '<th scope="col">ID</th>' +
            '<th scope="col">Compañía</th>' +
            '<th scope="col">Contacto</th> </tr> </thead> <tbody>';
            for(let i = 0; i < provJson.length; i++)
            {
                provHtml += '<tr> <th>' + provJson[i].idproveedor +'</th>'+
                            '<td>' + provJson[i].nombrecompania + '</td>'
                            +'<td>' + provJson[i].nombrecontacto + '</td>' +
                            '</tr>';
                
            }
            provHtml += '</tbody> </table> </div> ';
            var file_content = data.toString();
            file_content = file_content.substring(position);
            var file = fs.openSync("proveedores.html",'r+');
            var bot = provHtml + file_content;
            var bufferedTextProv = Buffer.from(bot);
            fs.writeSync(file, bufferedTextProv, 0, bufferedTextProv.length, position);
            fs.close(file, (err) => { 
                if (err) 
                  console.error('Failed to close file', err); 
                else { 
                  console.log("\n> File Closed successfully");
                  fs.readFile("proveedores.html",function (err, data1)
                {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data1.toString());
                    res.end();
                }); 
                }});
            }
          });
          });
    }
    else if(req.url == "/api/clientes")
    {
        fs.copyFile(file_path, "clientes.html", (err) => {
            if (err) throw err;
            fs.readFile(file_path, function read(err, data)
        {
            if (err) throw err;
            GetData1();
            async function GetData1()
            {
             var respu = await axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json');
             var clientJson = respu.data;
             var clientHtml = "<h2> Listado de Clientes </h2> \n" 
            + "<div class=\"card\"> \n <table class=\"table table-striped\">" +
            "<thead> \n <tr> \n "+
            "<th scope=\"col\">ID</th>" +
            "<th scope=\"col\">Compañía</th>" +
            "<th scope=\"col\">Contacto</th> \n </tr> \n </thead> \n <tbody> \n";
            for(let i = 0; i < clientJson.length; i++)
            {
                clientHtml += "<tr> \n <th>" + clientJson[i].idCliente +"</th> \n"+
                            "<td>" + clientJson[i].NombreCompania + "</td> \n"
                            +"<td>" + clientJson[i].NombreContacto + "</td> \n" +
                            "</tr> \n";
                
            }
            clientHtml += "</tbody> \n </table> \n </div> \n";
            var file_content = data.toString();
            file_content = file_content.substring(position);
            var file = fs.openSync("clientes.html",'r+');
            var bufferedText = new Buffer.from(clientHtml+file_content);
            fs.writeSync(file, bufferedText, 0, bufferedText.length, position);
            fs.close(file, (err) => { 
                if (err) 
                  console.error('Failed to close file', err); 
                else { 
                  console.log("\n> File Closed successfully"); 
                  fs.readFile('clientes.html',function (err, data)
                {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
                });
                }});
            }
          });
        });
    }
    else
    {
        fs.readFile('index.html',function (err, data)
                {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
                });
    }
    
}).listen(8081);