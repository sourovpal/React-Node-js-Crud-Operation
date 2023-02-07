
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast,  ToastContainer } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import StudentAction from './Actions/StudentAction';
//=================
function App() {
  // Data State
  const [formErrors, setFormErrors] = useState([]);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  // Loading State
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [createFormLoading, setCreateFormLoading] = useState(false);
  const [editFormLoading, setEditFormLoading] = useState(false);
  // Show State
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  // Function Handle
  const handleShow = () => {setShow(true); setFormErrors([]);};
  const handleClose = () => setShow(false);

  const handleEditClose = () => {setEditShow(false); setFormErrors([]);};
// ===============
  const getdata = async ()=>{
    const data = await StudentAction.get();
    setData(data);
    setLoading(false);
}
// ========================
const formSubmitHendale = async(e)=>{
  try{
    e.preventDefault();
    setFormErrors([]);
    setCreateFormLoading(true);
    const formData = new FormData(e.target);
    const data = await StudentAction.create(formData);
    if(data.status){
      getdata();
    }else{
      console.log(data.errors)
      setFormErrors(data.errors);
    }
    toast[data.status?'success':'error'](data.message, { position: toast.POSITION.TOP_RIGHT });
    setCreateFormLoading(false);
  }catch(error){
    setCreateFormLoading(false);
    toast['error'](typeof error.response == 'object'?error.response.data.message:error.message, { position: toast.POSITION.TOP_RIGHT });
  }
}
//=======================
const editFormSubmitHendale = async(e)=>{
  try{
      e.preventDefault();
      setFormErrors([]);
      setEditFormLoading(true);
      const formData = new FormData(e.target);
      const data  = await StudentAction.update(editData._id, formData);
      if(data.status){
        getdata();
      }else{
        setFormErrors(data.errors);
      }
      toast[data.status?'success':'error'](data.message, { position: toast.POSITION.TOP_RIGHT });
      setEditFormLoading(false);
  }catch(error){
    setEditFormLoading(false);
    toast['error'](typeof error.response == 'object'?error.response.data.message:error.message, { position: toast.POSITION.TOP_RIGHT });
  }
}
//=========================
const destroyStudent = async(id)=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to delete this student ?",
    icon: 'warning',
      showCancelButton: true,
      cancelButtonText:'No, Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
          try{
            const data =  await StudentAction.destroy(id);
            getdata();
            toast[data.status?'success':'error'](data.message, { position: toast.POSITION.TOP_RIGHT });
          }catch(error){
            toast['error'](typeof error.response == 'object'?error.response.data.message:error.message, { position: toast.POSITION.TOP_RIGHT });
          }
        }
    });
}

const editStudent = async(id)=>{
  setEditLoading(true);
  setEditShow(true);
  try{
      const data = await StudentAction.find(id);
      if(data.status){
        setEditData(data.data);
        setTimeout(()=>{
          setEditLoading(false);
        },2000);
      }else{
        setEditLoading(false);
        toast[data.status?'success':'error'](data.message, { position: toast.POSITION.TOP_RIGHT });
      }
  }catch(error){
    toast['error'](typeof error.response == 'object'?error.response.data.message:error.message, { position: toast.POSITION.TOP_RIGHT });
    setEditShow(false);
    setEditLoading(false);
  }
}

useEffect(()=>{
  setLoading(true);
  getdata();
}, []);

const columns = [
  {
    name: 'Avatar',
    selector: row => <img className='img-thumbnail m-1' width="50px" alt='' src={`http://localhost:8080/public/${row.avatar}`} />,
  },
  {
    name: 'Name',
    selector: row => row.name,
  },
  {
    name: 'Roll',
    selector: row => row.roll,
  },
  {
    name: 'Registration',
    selector: row => row.reg,
  },
  {
    name: 'Class',
    selector: row => row.class,
  },
  {
    name: 'Age',
    selector: row => row.age,
  },
  {
    name: 'Email',
    selector: row => row.email,
  },
  {
    name: 'Phone',
    selector: row => row.phone,
  },
  {
    name: 'Action',
    selector: row => <>
      <div>
        <button className='btn btn-warning btn-sm' onClick={()=> editStudent(row._id)} ><i className="fa fa-edit"></i></button>&nbsp;
        <button className='btn btn-danger btn-sm' onClick={()=> destroyStudent(row._id)} ><i className="fa fa-trash"></i></button>
      </div>
    </>,
  },
];

return (
  <div className="App">
    <div className='container'>
      <h1 className='my-5 text-center fw-bold text-secondary'>React & Node js Crud Operation</h1>
      <div>
        <Button variant='primary mb-3' onClick={handleShow}>New +</Button>
      </div>
      <DataTable
          columns={columns}
          data={data}
          progressPending={loading}
          fixedHeader
          fixedHeaderScrollHeight="700px"
          selectableRows
          pagination
      />

      <Modal show={show} onHide={handleClose} size='lg'>
          <form onSubmit={formSubmitHendale}>
            <Modal.Header closeButton>
              <Modal.Title>Add Student Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Student Name:</label>
                      <input name='name' className='form-control' />
                      {formErrors.name && <><span className='is-invalid'>{formErrors.name[0]}</span></>}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Roll:</label>
                      <input name='roll' className='form-control' />
                      {formErrors.roll && <><span className='is-invalid'>{formErrors.roll[0]}</span></>}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Registration:</label>
                      <input name='reg' className='form-control' />
                      {formErrors.reg && <><span className='is-invalid'>{formErrors.reg[0]}</span></>}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Class:</label>
                      <input name='class' className='form-control' />
                      {formErrors.class && <><span className='is-invalid'>{formErrors.class[0]}</span></>}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Age:</label>
                      <input name='age' className='form-control' />
                      {formErrors.age && <><span className='is-invalid'>{formErrors.age[0]}</span></>}
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Avatar:</label>
                      <input name='avatar' className='form-control' type={'file'} />
                      {formErrors.avatar && <><span className='is-invalid'>{formErrors.avatar[0]}</span></>}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>E-mail:</label>
                      <input name='email' className='form-control' />
                      {formErrors.email && <><span className='is-invalid'>{formErrors.email[0]}</span></>}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Phone:</label>
                      <input name='phone' className='form-control' />
                      {formErrors.phone && <><span className='is-invalid'>{formErrors.phone[0]}</span></>}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Password:</label>
                      <input name='password' className='form-control' />
                      {formErrors.password && <><span className='is-invalid'>{formErrors.password[0]}</span></>}
                    </div>
                    <div className='mb-3'>
                      <label htmlFor="" className='form-label'>Confirm Password:</label>
                      <input name='password_confirmation' className='form-control' />
                      {formErrors.password_confirmation && <><span className='is-invalid'>{formErrors.password_confirmation[0]}</span></>}
                    </div>
                  </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className='d-flex justify-content-between align-items-center' variant="primary" type='submit' disabled={createFormLoading}>
                {
                  createFormLoading && 
                  <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                }
                Submit
              </Button>
            </Modal.Footer>
          </form>
      </Modal>

      <Modal show={editShow} onHide={handleEditClose} size='lg'>
          <form onSubmit={editFormSubmitHendale}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Student Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                editLoading? <>
                <div style={{height:'400px'}}>
                  <div className="mesh-loader">
                    <div className="set-one">
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                    <div className="set-two">
                      <div className="circle"></div>
                      <div className="circle"></div>
                    </div>
                  </div>
                </div>
                </>:<>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Student Name:</label>
                          <input name='name' className='form-control' onChange={(e)=> setEditData((prev)=>({...prev, name:e.target.value}))} value={editData.name} />
                          {formErrors.name && <><span className='is-invalid'>{formErrors.name[0]}</span></>}
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Roll:</label>
                          <input name='roll' className='form-control' onChange={(e)=> setEditData((prev)=>({...prev, roll:e.target.value}))} value={editData.roll} />
                          {formErrors.roll && <><span className='is-invalid'>{formErrors.roll[0]}</span></>}
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Registration:</label>
                          <input name='reg' className='form-control' onChange={(e)=> setEditData((prev)=>({...prev, reg:e.target.value}))} value={editData.reg} />
                          {formErrors.reg && <><span className='is-invalid'>{formErrors.reg[0]}</span></>}
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Class:</label>
                          <input name='class' className='form-control' onChange={(e)=> setEditData((prev)=>({...prev, 'class':e.target.value}))} value={editData.class} />
                          {formErrors.class && <><span className='is-invalid'>{formErrors.class[0]}</span></>}
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Age:</label>
                          <input name='age' className='form-control' onChange={(e)=> setEditData((prev)=>({...prev, reg:e.target.value}))} value={editData.age} />
                          {formErrors.age && <><span className='is-invalid'>{formErrors.age[0]}</span></>}
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Avatar:</label>
                          {/* <input name='avatar' className='form-control' /> */}
                          <input name='avatar' className='form-control' type={'file'} />
                          {formErrors.avatar && <><span className='is-invalid'>{formErrors.avatar[0]}</span></>}
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>E-mail:</label>
                          <input name='email' className='form-control' onChange={(e)=> setEditData((prev)=>({...prev, email:e.target.value}))} value={editData.email} />
                          {formErrors.email && <><span className='is-invalid'>{formErrors.email[0]}</span></>}
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Phone:</label>
                          <input name='phone' className='form-control' onChange={(e)=> setEditData((prev)=>({...prev, phone:e.target.value}))} value={editData.phone} />
                          {formErrors.phone && <><span className='is-invalid'>{formErrors.phone[0]}</span></>}
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Password:</label>
                          <input name='password' className='form-control' onChange={(e)=> setEditData((prev)=>({...prev, password:e.target.value}))} value={editData.password} />
                          {formErrors.password && <><span className='is-invalid'>{formErrors.password[0]}</span></>}
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="" className='form-label'>Confirm Password:</label>
                          <input name='password_confirmation' className='form-control' />
                          {formErrors.password_confirmation && <><span className='is-invalid'>{formErrors.password_confirmation[0]}</span></>}
                        </div>
                      </div>
                    </div>
                </>
              }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>
                Close
              </Button>
              <Button className='d-flex justify-content-between align-items-center' variant="warning" type='submit' disabled={editFormLoading}>
                {
                  editFormLoading && 
                  <div className="spinner-border spinner-border-sm text-dark me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                }
                Update
              </Button>
            </Modal.Footer>
          </form>
      </Modal>
    </div>
    <ToastContainer />
  </div>
  );
}

export default App;
