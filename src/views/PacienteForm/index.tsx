import { postData } from "../../services/apiService";
import { IPaciente } from "../../domain/interfaces";
import * as Yup from 'yup';
import React from 'react';
import { TextField, Button, Grid, Container, Paper, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const PacienteValidationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .min(2, 'El nombre es demasiado corto')
      .max(100, 'El nombre es demasiado largo'),
    fechaNacimiento: Yup.date()
      .required('La fecha de nacimiento es obligatoria')
      .max(new Date(), 'La fecha de nacimiento no puede estar en el futuro')
  });


  const PacienteForm: React.FC = () => {
    const navigate = useNavigate();
    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Creación de Pacientes
            </Typography>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    nombre: '',
                    fechaNacimiento: new Date().toDateString()
                }}
                validationSchema={PacienteValidationSchema}
                onSubmit={async (values: IPaciente, actions) => {
                    // Aquí manejas el envío de datos
                    try {
                        await postData("/pacientes", values);
                        Swal.fire("Éxito", "Paciente registrado exitosamente", "success").then(() => {
                            actions.resetForm(); 
                            navigate('/')
                        });
                        //Quiero que despues del aceptar del sweet alert, limpie el formulario y luego redirija a "/"
                    } catch (error) {
                        Swal.fire("Error", "Error al registrar paciente", "error");
                    }
                    actions.setSubmitting(false);
                }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        as={TextField} 
                        variant="outlined"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        name="nombre"
                        autoComplete="nombre"
                        helperText={<ErrorMessage name="nombre" />}
                        error={Boolean(<ErrorMessage name="nombre" />)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            as={TextField}
                            variant="outlined"
                            required
                            fullWidth
                            id="fechaNacimiento"
                            label="Fecha de Nacimiento"
                            name="fechaNacimiento"
                            type="date"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            helperText={<ErrorMessage name="fechaNacimiento" />}
                            error={Boolean(<ErrorMessage name="fechaNacimiento" />)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                      >
                        Guardar
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
        </Paper>
      </Container>
    );
  };
  
  export default PacienteForm;
 