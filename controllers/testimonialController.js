import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {

    //Valirar formulario

    // console.log(req.body);

    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === '') {//trim quita los espacios en blanco al inicio y final
        errores.push({ mensaje: 'El nombre esta vacio!' });
    }

    if (correo.trim() === '') {//trim quita los espacios en blanco al inicio y final
        errores.push({ mensaje: 'El correo esta vacio!' });
    }

    if (mensaje.trim() === '') {//trim quita los espacios en blanco al inicio y final
        errores.push({ mensaje: 'El mensaje esta vacio!' });
    }

    // console.log(errores);

    if(errores.length > 0){

        //Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        // mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        //Almacenar en la base de datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }

    }

}

export {
    guardarTestimonial
}