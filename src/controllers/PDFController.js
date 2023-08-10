const fs = require('fs')
const path = require('path')
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const { conexion } = require('../database/conexion')
const { SEARCH_SALE, SELECT_PRODUCT_ID } = require('../services/MysqlQueries')

const uploadDir = path.join('public', 'reports')

exports.pdf_almacen = async (req, res) => {

    const pdfDoc = await PDFDocument.create()

    const page = pdfDoc.addPage()

    const { width, height } = page.getSize()

    const fontSize = 30

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const id = req.params.id
    
    conexion.query(SELECT_PRODUCT_ID, [id], async (error, results) => {
        if(error) {
            console.log(error);
            return res.status(401).json({status: false, message: 'Ocurrió un error al buscar la venta'})
        }
        const creacion_fecha = results[0]['creacion_fecha'] !== undefined ? results[0]['creacion_fecha'] : new Date()

        const date = new Date(creacion_fecha)

        const name = `Producto_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
        

        const joinName = path.join(uploadDir, `${name}.pdf`)

        page.drawText('Reporte de Productos - Santa Fe',{
            x: 50,
            y: height - 2 * fontSize,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0,0,0)
        })

        page.drawText(`#ID ${results[0]['id']}`,{
            x: 120, y: 700, size: 18, font: helveticaFont
        })
        page.drawText(`Nombre: ${results[0]['nombre']}`,{
            x: 120, y: 600, size: 18, font: helveticaFont
        })
        page.drawText(`Descripción: ${results[0]['descripcion']}`,{
            x: 120, y: 500, size: 18, font: helveticaFont
        })
        page.drawText(`Precio: ${results[0]['precio_venta']}`,{
            x: 120, y: 400, size: 18, font: helveticaFont
        })
        page.drawText(`Stock: ${results[0]['stock']}`,{
            x: 120, y: 300, size: 18, font: helveticaFont
        })

        const pdfBytes = await pdfDoc.save()

        fs.writeFileSync(joinName, pdfBytes)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `inline; filename=${name}.pdf`)
        fs.createReadStream(joinName).pipe(res)
    })

}

exports.pdf_cocina = (req, res) => {

}

exports.pdf_ventas = async(req, res) => {
    const pdfDoc = await PDFDocument.create()

    const page = pdfDoc.addPage()

    const { width, height } = page.getSize()

    const fontSize = 30

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const id = req.params.id

    conexion.query(SEARCH_SALE, [id], async (error, results) => {
        if(error) {
            console.log(error);
            return res.status(401).json({status: false, message: 'Ocurrió un error al buscar la venta'})
        }

        const creacion_fecha = results[0]['creacion_fecha'] !== undefined ? results[0]['creacion_fecha'] : new Date()

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

        page.drawText(`#ID: ${results[0]['id']}`,{
            x: 120, y: 700, size: 18, font: helveticaFont
        })
        page.drawText(`Nombre del Usuario: ${results[0]['nombre_usuario']}`,{
            x: 120, y: 600, size: 18, font: helveticaFont
        })
        page.drawText(`Cliente: ${results[0]['cliente']}`,{
            x: 120, y: 500, size: 18, font: helveticaFont
        })
        page.drawText(`Tipo de Cliente: ${results[0]['tipo_cliente']}`,{
            x: 120, y: 400, size: 18, font: helveticaFont
        })
        page.drawText(`Fecha: ${new Date(results[0]['fecha']).toUTCString()}`,{
            x: 120, y: 300, size: 18, font: helveticaFont
        })

        const pdfBytes = await pdfDoc.save()

        fs.writeFileSync(joinName, pdfBytes)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `inline; filename=${name}.pdf`)
        fs.createReadStream(joinName).pipe(res)
    })
}