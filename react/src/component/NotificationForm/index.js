import { useEffect, useState } from "react"
import axios from "axios"
import * as Yup from 'yup'
import { Formik, Field, Form } from "formik"
import {toast, ToastContainer} from 'react-toastify';
import { BASEAPIURL } from "../../config"
import "yup-phone"
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"

const formSchema = Yup.object().shape({
    phone_checked: Yup.boolean(),
    email_checked: Yup.boolean(),
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string().when('email_checked', {
        is: (email_checked) => email_checked === true,
        then: Yup.string().email("Invalid email").required("This field is required"),
        otherwise: Yup.string(),
      }),
    phoneNumber: Yup.string().when('phone_checked', {
        is: (phone_checked)=> phone_checked===true,
        then: Yup.string().phone().required("This field is required"),
        otherwise: Yup.string(),
      }),
    supervisor:Yup.string().required("This field is required"),

})
toast.configure()
const NotificationForm = () => {
    const [supervisors, setSupervisors] = useState([])
    useEffect(() => {
        getSupervisors()
    }, [])

    const getSupervisors = () => {
        axios.get(`${BASEAPIURL}/api/supervisors`).then((res) => {
            setSupervisors(res.data || [])
        })
    }
    const submitForm = (data) =>{
        axios.post(`${BASEAPIURL}/api/submit`, data)
          .then(function (response) {
            if(response.data.status === 'error'){
                toast(response.data.message)
            }else{
                console.log(response);
                toast("Form submitted successfully")
            }
            
          })
          .catch(function (error) {
            toast(error)
          });
    }
    return (
        <div className="form-container">
            <div className="form-content">
                <div className="form-header">
                    <h1>Notification Form</h1>
                </div>
                <div className="form-body">
                    <Formik
                        initialValues={{ firstName: "", lastName:"", email: "", phoneNumber: "", supervisor: "", notify_checked: []}}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            submitForm(values)
                        }}
                    >{({ errors, touched }) =>(
                        <Form className="form">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Field id="firstName" className="input-field" name="firstName" type="text" />
                                {errors.firstName && touched.firstName ? (
                                    <div className="error">{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Field id="lastName" className="input-field" name="lastName" type="text" />
                                {errors.lastName && touched.lastName ? (
                                    <div className="error">{errors.lastName}</div>
                                ) : null}
                            </div>
                            
                            <div className="form-group">
                                
                                <label htmlFor="email" className="email"><Field id="email" type="checkbox" className="notify_checkbox" name="email_checked"/>Email
                                <span className="notify-suggestion-tip">How would you prefer to be notified?</span></label>
                                
                                <Field  className="input-field" name="email" type="email" />
                                {errors.email && touched.email ? (
                                    <div className="error">{errors.email}</div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber"><Field id="phoneNumber" type="checkbox" name="phone_checked" className="notify_checkbox"/>Phone Number</label>
                                <Field  className="input-field" name="phoneNumber" type="text" />
                                {errors.phoneNumber && touched.phoneNumber ? (
                                    <div className="error">{errors.phoneNumber}</div>
                                ) : null}
                            </div>
                            <div className="supervisor">
                                <div className="form-group">
                                    <label htmlFor="supervisor">Supervisor</label>
                                    <Field as="select" className="input-field supervisor"  name="supervisor">
                                    <option key="-1">Please select supervisor</option>
                                        {
                                            supervisors.map((it, index)=>{
                                                return <option key={index} value={it}>{it}</option>
                                            })
                                        }
                                    </Field>
                                    {errors.supervisor && touched.supervisor ? (
                                        <div className="error">{errors.supervisor}</div>
                                    ) : null}
                                </div>
                            </div>
                            
                            <div className="form-group submit">
                            <button className="btn-submit" type="submit">Submit</button>
                            </div>
                        </Form>)}
                    </Formik>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
export default NotificationForm
