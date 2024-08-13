import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, editUser, deleteUser } from '../redux/userSlice';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const UserSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  avatar: Yup.string().url().required('Required')
});

const ManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Manage Users</h1>
      <Formik
        initialValues={{ name: '', email: '', avatar: '' }}
        validationSchema={UserSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addUser(values));
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" placeholder="User Name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field name="email" placeholder="User Email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="avatar" placeholder="User Avatar URL" />
            {errors.avatar && touched.avatar ? <div>{errors.avatar}</div> : null}
            <button type="submit">Add User</button>
          </Form>
        )}
      </Formik>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.name} width="50" />
            {user.name} - {user.email}
            <button onClick={() => dispatch(editUser({ ...user, name: 'New Name' }))}>Edit</button>
            <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
