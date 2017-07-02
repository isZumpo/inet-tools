import Printer from './Printer.js';


class PrinterFactory {

    static createPrinterList() {
        let printerList = [];
        this.getPrintersList('https://www.inet.se/kategori/209/blackpatroner', printerList);
        this.getPrintersList('https://www.inet.se/kategori/210/lasertoner', printerList);
        return printerList;
    }

    static getPrintersList(url, printerList) {
        let cheerio = require('cheerio');
        let request = require('request');

        let printerBrands = [];

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(response.body);

                //Get all printer brands
                $('#consumables-brands option').each(function (index) {
                    let value = $(this).val();
                    if (value != "") {
                        printerBrands.push({value: value});
                    }
                });

                //Get information about each printer of every brand
                for (let printerBrand in printerBrands) {
                    request(url + '?selectedBrand=' + printerBrands[printerBrand].value + '&search=', function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            let $ = cheerio.load(response.body);
                            $('.consumables-printer-list a').each(function (index) {
                                //Create and set printer properties
                                let printer = new Printer();
                                printer.name = $(this).html();
                                printer.brand = printerBrands[printerBrand].value;
                                printer.inkUrl = url + $(this).attr('href');
                                printer.id = printerList.length;
                                printerList.push(printer);
                            });
                        }
                    });
                }
            }
        });


    }
}

export default PrinterFactory;
