import React, { useEffect } from "react";
import { Formik, FieldArray, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const YourForm = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    about: Yup.string().required("About is required"),
    education: Yup.array().of(
      Yup.object().shape({
        school: Yup.string().required("School is required"),
        yearOfPassing: Yup.number().required("Year of Passing is required"),
        score: Yup.number().required("Score is required"),
      })
    ),
  });

  const initialValues = {
    username: "",
    email: "",
    about: "",
    education: [{ school: "", yearOfPassing: "", score: "" }],
  };

  return (
    <div className="max-w-md mx-auto mt-5 p-5 bg-gray-100 rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values); // Pass the values to the parent component
          resetForm(); // Clear the form
          localStorage.setItem("formData", JSON.stringify(values));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="mt-1 p-2 rounded-md w-full"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 rounded-md w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                About
              </label>
              <Field
                as="textarea"
                id="about"
                name="about"
                className="mt-1 p-2 rounded-md w-full"
              />
              <ErrorMessage
                name="about"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <FieldArray name="education">
                {(arrayHelpers) => (
                  <div>
                    {values.education.map((edu, index) => (
                      <div key={index} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          School
                        </label>
                        <Field
                          type="text"
                          name={`education.${index}.school`}
                          className="mt-1 p-2 rounded-md w-full"
                        />
                        <ErrorMessage
                          name={`education.${index}.school`}
                          component="div"
                          className="text-red-500"
                        />

                        <label className="block text-sm font-medium text-gray-700">
                          Year of Passing
                        </label>
                        <Field
                          type="text"
                          name={`education.${index}.yearOfPassing`}
                          className="mt-1 p-2 rounded-md w-full"
                        />
                        <ErrorMessage
                          name={`education.${index}.yearOfPassing`}
                          component="div"
                          className="text-red-500"
                        />

                        <label className="block text-sm font-medium text-gray-700">
                          Score
                        </label>
                        <Field
                          type="text"
                          name={`education.${index}.score`}
                          className="mt-1 p-2 rounded-md w-full"
                        />
                        <ErrorMessage
                          name={`education.${index}.score`}
                          component="div"
                          className="text-red-500"
                        />

                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="mt-2 bg-red-500 text-white p-2 rounded-md"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          school: "",
                          yearOfPassing: "",
                          score: "",
                        })
                      }
                      className="mt-4 bg-blue-500 text-white p-2 rounded-md"
                    >
                      Add Education
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default YourForm;
