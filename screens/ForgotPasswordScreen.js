import React, { useState } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import { auth } from '../firebaseConfig'; // Đảm bảo import firebaseConfig đúng cách
import { passwordResetSchema } from '../utils';
import { Colors } from '../config';
import { View, TextInput, Button, FormErrorMessage } from '../components';
import { sendPasswordResetEmail } from 'firebase/auth'; 

export const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');

  const handleSendPasswordResetEmail = async (values) => {
    const { email } = values;
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Check your email to reset your password.'); // Hiển thị alert thành công
      setErrorState(''); // Reset lỗi nếu có
    } catch (error) {
      setErrorState(error.message);
      Alert.alert('Error', error.message); // Hiển thị alert lỗi
    }
  };

  return (
    <View isSafe style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.screenTitle}>Reset your password</Text>
      </View>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={passwordResetSchema}
        onSubmit={values => handleSendPasswordResetEmail(values)}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur
        }) => (
          <>
            {/* Email input field */}
            <TextInput
              name='email'
              leftIconName='email'
              placeholder='Enter email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />

            {/* Hiển thị thông báo lỗi nếu có */}
            {errorState !== '' && (
              <FormErrorMessage error={errorState} visible={true} />
            )}

            {/* Nút gửi email reset mật khẩu */}
            <Button style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Send Reset Email</Text>
            </Button>
          </>
        )}
      </Formik>

      {/* Nút để quay lại màn hình đăng nhập */}
      <Button
        style={styles.borderlessButtonContainer}
        borderless
        title={'Go back to Login'}
        onPress={() => navigation.navigate('LoginScreen')} // Navigate back to LoginScreen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12
  },
  innerContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
