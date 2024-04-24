const sharp = require('sharp');
const compress_images = require("compress-images");
const fs = require('fs')

let inputPath = process.argv[2]
let outputPath = process.argv[3]
let width = Number(process.argv[4])
let deg = Number(process.argv[5])


function resize(inputPath, outputPath, width, deg) {

    sharp(inputPath).resize({ width: width }).rotate(deg)
        .toFile(outputPath, (error) => {

            if (error) {
                console.log(error)
            } else {
                console.log('Imagem Redimensionada com Sucesso!')

                if (deg == 0) {
                    console.log(" ")
                } else {
                    console.log('Imagem rotacionada')
                }

                compress(outputPath, "./compressed/")
            }
        })
}

function compress(inputPath, outputPath) {

    compress_images(inputPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },


        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");

            fs.unlink(inputPath, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(" ")
                }
            })

        }


    );

}


resize(`./img/${inputPath}`, `./temp/${outputPath}`, width, deg)
