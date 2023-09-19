import { postData } from "../../services/apiService";
import { IEstudio } from "../../domain/interfaces";
import * as Yup from 'yup';
import React from 'react';
import { TextField, Button, Grid, Container, Paper, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const EstudioValidationSchema = Yup.object().shape({
  pacienteId: Yup.number()
    .required('El ID del paciente es obligatorio')
    .positive('El ID debe ser positivo')
    .integer('El ID debe ser un número entero'),
  porcentajeAzucar: Yup.number()
    .required('El porcentaje de azúcar es obligatorio')
    .min(0, 'El porcentaje no puede ser negativo')
    .max(100, 'El porcentaje no puede ser mayor que 100'),
  porcentajeGrasa: Yup.number()
    .required('El porcentaje de grasa es obligatorio')
    .min(0, 'El porcentaje no puede ser negativo')
    .max(100, 'El porcentaje no puede ser mayor que 100'),
  porcentajeOxigeno: Yup.number()
    .required('El porcentaje de oxígeno es obligatorio')
    .min(0, 'El porcentaje no puede ser negativo')
    .max(100, 'El porcentaje no puede ser mayor que 100')
});


  const PacienteForm: React.FC = () => {
    const navigate = useNavigate();
    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
              Registro de Estudio de Sangre
            </Typography>
            <Formik
                enableReinitialize={true}
                initialValues={{
                  pacienteId: 0,
                  porcentajeAzucar: 0,
                  porcentajeGrasa: 0,
                  porcentajeOxigeno: 0
                }}
                validationSchema={EstudioValidationSchema}
                onSubmit={async (values: IEstudio, actions) => {
                    // Aquí manejas el envío de datos
                    try {
                        await postData(`/pacientes/${values.pacienteId}/estudios`, values);
                        Swal.fire("Éxito", "Estudio de paciente registrado exitosamente", "success").then(() => {
                            actions.resetForm(); 
                            navigate('/')
                        });
                        //Quiero que despues del aceptar del sweet alert, limpie el formulario y luego redirija a "/"
                    } catch (error) {
                        Swal.fire("Error", "Error al registrar el estudio del paciente", "error");
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
                              id="pacienteId"
                              label="ID del Paciente"
                              name="pacienteId"
                              autoComplete="pacienteId"
                              type="number"
                              helperText={<ErrorMessage name="pacienteId" />}
                              error={Boolean(<ErrorMessage name="pacienteId" />)}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <Field
                              as={TextField}
                              variant="outlined"
                              required
                              fullWidth
                              id="porcentajeAzucar"
                              label="Porcentaje de Azúcar"
                              name="porcentajeAzucar"
                              autoComplete="porcentajeAzucar"
                              type="number"
                              helperText={<ErrorMessage name="porcentajeAzucar" />}
                              error={Boolean(<ErrorMessage name="porcentajeAzucar" />)}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <Field
                              as={TextField}
                              variant="outlined"
                              required
                              fullWidth
                              id="porcentajeGrasa"
                              label="Porcentaje de Grasa"
                              name="porcentajeGrasa"
                              autoComplete="porcentajeGrasa"
                              type="number"
                              helperText={<ErrorMessage name="porcentajeGrasa" />}
                              error={Boolean(<ErrorMessage name="porcentajeGrasa" />)}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <Field
                              as={TextField}
                              variant="outlined"
                              required
                              fullWidth
                              id="porcentajeOxigeno"
                              label="Porcentaje de Oxígeno"
                              name="porcentajeOxigeno"
                              autoComplete="porcentajeOxigeno"
                              type="number"
                              helperText={<ErrorMessage name="porcentajeOxigeno" />}
                              error={Boolean(<ErrorMessage name="porcentajeOxigeno" />)}
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
                              Registrar Estudio
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
 