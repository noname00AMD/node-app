 
 function finalHandle(err , req, res ,opts) {
     if(opts.env === "dev"){
        //  console.error(err);
        //  return
     }
    res.setHeader('Content-Type', 'text/html')
    res.setHeader("charset", "UTF-8")
    res.statusCode = err.code || 404
    var message = err.message || "not found"
    var doc = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="icon" type="image/png" href="https://www.herokucdn.com/favicons/favicon.ico"/>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${res.statusCode} || ${message}</title>
        </head>
        <body>
            <h1 style="text-transform:uppercase"><b>${message}</b></h1>
            <h3>Code ${res.statusCode}</h3>
            <h4>${err.stack}</h4>
            <p>final handle </p>
        </body>
    </html>`
    res.end(doc)
}
module.exports = finalHandle