const fs = require('fs')
const path = require('path')
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const  { drawTable } = require('pdf-lib-draw-table-beta')
const { conexion } = require('../database/conexion')
const { SEARCH_SALE, SELECT_PRODUCT_ID, SELECT_COCINA_ID } = require('../services/MysqlQueries')

const uploadDir = path.join('public', 'reports')

exports.pdf_almacen = async (req, res) => {

    const pdfDoc = await PDFDocument.create()

    const page = pdfDoc.addPage([1000,1000])

    const { width, height } = page.getSize()

    const fontSize = 30

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const id = req.params.id
    // console.log(id);
    conexion.query(SELECT_PRODUCT_ID, [id], async (error, results) => {
        if(error) {
            console.log(error);
            return res.status(401).json({status: false, message: 'Ocurrió un error al buscar la venta'})
        }
        // console.log(results);
        let creacion_fecha
        if(results.length === 0)
            creacion_fecha = new Date()
        else
            creacion_fecha = results[0]['creacion_fecha'] 

        const date = new Date(creacion_fecha)

        const name = `Almacen_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
        

        const joinName = path.join(uploadDir, `${name}.pdf`)
        // set title for report
        page.drawText('Reporte de Almacen - Santa Fe',{
            x: 50,
            y: height - 2 * fontSize,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0,0,0)
        })
        
        const products = results.map(product => {

            const currentDate = new Date(product['creacion_fecha'])
            const format = formatDate(currentDate)
            const caducidadDate = new Date(product['caducidad'])
            const caducidad = formatDate(caducidadDate)

            return [
                product['id'].toString(),
                product['codigo_barras'],
                product['nombre'],
                product['descripcion'],
                caducidad,
                product['precio_venta'].toString(),
                product['stock'].toString(),
                format
            ]
        })
        // define table
        const tableData = [
            ['ID','Codigo','Producto','Descripción','Caducidad','Precio','Stock', 'Fecha'],
            ...products
        ];
        // console.log(products);
        // define positions
        const startX = 50;
        const startY = 850;
        // 
        const options = {
            header: {
                hasHeaderRow: true,
                backgroundColor: rgb(0,0,0)
            }
        }
        try {
            // draw table
            const tableDimensions = await drawTable(pdfDoc, page, tableData, startX, startY, options);
            // console.log(tableDimensions);
            // Serialize pdf to bytes and write to a file
            const pdfBytes = await pdfDoc.save()

            fs.writeFileSync(joinName, pdfBytes)

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename=${name}.pdf`)
            fs.createReadStream(joinName).pipe(res)
        } catch (error) {
            console.error('error drawing table:', error)
        }
    })

}

exports.pdf_cocina = async(req, res) => {

    const pdfDoc = await PDFDocument.create()

    const page = pdfDoc.addPage([1000,1000])

    const { width, height } = page.getSize()

    const fontSize = 30

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const id = req.params.id
    console.log(id);
    conexion.query(SELECT_COCINA_ID, [id], async (error, results) => {
        if(error) {
            console.log(error);
            return res.status(401).json({status: false, message: 'Ocurrió un error al buscar la venta'})
        }
        console.log(results);
        let creacion_fecha = new Date()
        if(results.length === 0)
            return res.status(401).json({status:false})

        if(results[0]['created_at'])
            creacion_fecha = results[0]['created_at'] 

        const date = new Date(creacion_fecha)

        const name = `Cocina_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
        

        const joinName = path.join(uploadDir, `${name}.pdf`)
        // set title for report
        page.drawText('Reporte de Cocina - Santa Fe',{
            x: 50,
            y: height - 2 * fontSize,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0,0,0)
        })
        const products = results.map(product => {

            const currentDate = new Date(product['created_at'])
            const format = formatDate(currentDate)

            return [
                product['id'].toString(),
                product['codigo_barras'],
                product['nombre'],
                product['usuario'],
                product['cliente'],
                product['precio'].toString(),
                product['stock'].toString(),
                format
            ]
        })
        // define table
        const tableData = [
            ['ID','Codigo','Producto','Usuario', 'Cliente', 'Precio','Stock', 'Fecha'],
            ...products
        ];
        // console.log(products);
        // define positions
        const startX = 50;
        const startY = 850;
        // 
        const options = {
            header: {
                hasHeaderRow: true,
                backgroundColor: rgb(0,0,0)
            }
        }
        try {
            // draw table
            const tableDimensions = await drawTable(pdfDoc, page, tableData, startX, startY, options);
            // console.log(tableDimensions);
            // Serialize pdf to bytes and write to a file
            const pdfBytes = await pdfDoc.save()

            fs.writeFileSync(joinName, pdfBytes)

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename=${name}.pdf`)
            fs.createReadStream(joinName).pipe(res)
        } catch (error) {
            console.error('error drawing table:', error)
        }
    })
}

exports.pdf_ventas = async(req, res) => {
    const pdfDoc = await PDFDocument.create()

    const page = pdfDoc.addPage([1000,1000])

    const { width, height } = page.getSize()

    const fontSize = 30

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const id = req.params.id

    conexion.query(SEARCH_SALE, [id], async (error, results) => {
        if(error) {
            console.log(error);
            return res.status(401).json({status: false, message: 'Ocurrió un error al buscar la venta'})
        }
        // console.log(results);
        if(results.length === 0)
            return res.status(401).json({status:false})

        const creacion_fecha = results[0]['fecha']

        const date = new Date(creacion_fecha)

        const name = `Venta_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`

        const joinName = path.join(uploadDir, `${name}.pdf`)

        page.drawText('Reporte de Ventas - Santa Fe',{
            x: 50,
            y: height - 2 * fontSize,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0,0,0)
        })

        const sales = results.map(sale => {
            const currentDate = new Date(sale['fecha'])
            const format = formatDate(currentDate)

            return [
                sale['id'].toString(),
                sale['nombre_usuario'],
                sale['tipo_venta'],
                sale['tipo_cliente'].toString(),
                format,
                sale['total'].toString()
            ]
        })
        // define table
        const tableData = [
            ['ID', 'Usuario', 'Tipo de Venta', 'Tipo de Cliente', 'Fecha', 'Total'],
            ...sales
        ];
        // define positions
        const startX = 50;
        const startY = 850;
        // 
        const options = {
            header: {
                hasHeaderRow: true,
                backgroundColor: rgb(0,0,0)
            }
        }
        try {
            // draw table
            const tableDimensions = await drawTable(pdfDoc, page, tableData, startX, startY, options);

            const pdfBytes = await pdfDoc.save()
            //save file
            fs.writeFileSync(joinName, pdfBytes)
            // send
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename=${name}.pdf`)
            fs.createReadStream(joinName).pipe(res)
            
        } catch (error) {
            console.error(error)
        }
    })
}
/**
 * Format Date Y-m-d with includes cero
 * @param {Date} currentDate 
 * @returns {String}
 */
const formatDate = (currentDate) => {
    return `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`
}