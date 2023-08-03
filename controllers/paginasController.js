import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {//req lo que enviados res lo que express nos responde

    //Consultar 3 viajes del modelo viaje
    const primiseDB = [];
    primiseDB.push(Viaje.findAll({ limit: 3 }));
    primiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {
        // const viajes = await Viaje.findAll({ limit: 3 });
        // const testimoniales = await Testimonial.findAll({ limit: 3 });

        const resultado = await Promise.all(primiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }


}

const paginaNosotros = (req, res) => {

    // const viajes = 'Viaje a Alemania';

    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    //consultar base de datos
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }

}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    // console.log(req.params.viaje);

    const { slug } = req.params;

    try {

        const viaje = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })

    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}



  