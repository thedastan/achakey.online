import React, { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from '@chakra-ui/react'
import { IAuthForgot } from './formInterfaces'

const AuthorationForgot: FC = () => {
  const [passEye, setPassEye] = useState(false)
  const [secondPassEye, setSecondPassEye] = useState(false)

  const handleClick = () => {
    setPassEye(!passEye)
  }

  const handleSecondClick = () => {
    setSecondPassEye(!secondPassEye)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForgot>()

  const onSubmit: SubmitHandler<IAuthForgot> = (data) => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <Box w="100%" px={{ sm: '20px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Box mb="10px">
            <Input
              {...register('emailOrNumber', {
                required: 'введите почту или номер',
              })}
              type="text"
              placeholder="Почта или номер*"
              border="1px"
              borderColor="#174079"
              bg="#ffffff"
              borderRadius={{ base: '10px', sm: '15px' }}
              fontSize="14px"
              py={{ base: '10px', sm: '25px' }}
              color="#000000"
            />
            <Text
              color="red.500"
              fontSize="12px"
              ml={{ base: '5px', sm: '14px' }}
            >
              {errors.emailOrNumber && errors.emailOrNumber?.message}
            </Text>
          </Box>
          <Box mb="10px">
            <InputGroup>
              <Input
                {...register('password', { required: 'введите пароль' })}
                type={passEye ? 'text' : 'password'}
                placeholder="Пароль*"
                border="1px"
                borderColor="#174079"
                bg="#ffffff"
                borderRadius={{ base: '10px', sm: '15px' }}
                fontSize="14px"
                py={{ base: '10px', sm: '25px' }}
                color="#000000"
              />
              <InputRightElement width="3rem" h="100%">
                <Box
                  color="#2A3654"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  fontSize={{ base: '20px', sm: '25px' }}
                  onClick={handleClick}
                >
                  {passEye ? <BsEyeSlashFill /> : <BsEyeFill />}
                </Box>
              </InputRightElement>
            </InputGroup>
            <Text
              color="red.500"
              fontSize="12px"
              ml={{ base: '5px', sm: '14px' }}
            >
              {errors.password && errors.password?.message}
            </Text>
          </Box>
          <Box mb="10px">
            <InputGroup>
              <Input
                {...register('forgotPassword', { required: 'введите пароль' })}
                type={secondPassEye ? 'text' : 'password'}
                placeholder="Потвердите пароль*"
                border="1px"
                borderColor="#174079"
                bg="#ffffff"
                borderRadius={{ base: '10px', sm: '15px' }}
                fontSize="14px"
                py={{ base: '10px', sm: '25px' }}
                color="#000000"
              />
              <InputRightElement width="3rem" h="100%">
                <Box
                  color="#2A3654"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  fontSize={{ base: '20px', sm: '25px' }}
                  onClick={handleSecondClick}
                >
                  {secondPassEye ? <BsEyeSlashFill /> : <BsEyeFill />}
                </Box>
              </InputRightElement>
            </InputGroup>
            <Text
              color="red.500"
              fontSize="12px"
              ml={{ base: '5px', sm: '14px' }}
            >
              {errors.forgotPassword && errors.forgotPassword?.message}
            </Text>
          </Box>
          <Button
            mt={{ base: '10px', sm: '15px' }}
            type="submit"
            bg="#2A3654"
            color="white"
            fontWeight="600"
            w="100%"
            py="25px"
            colorScheme="blue"
            fontSize={{ base: '14px', sm: '18px' }}
            borderRadius="14px"
          >
            Войти
          </Button>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={{ base: 'column', sm: 'row' }}
            my="10px"
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="14px"
          >
            <Text color="#353535" pr="5px">
              Нет аккаунта?
            </Text>
            <Link color="rgba(59,113,254,1)">Зарегистрироватсься?</Link>
          </Box>
        </FormControl>
      </form>
    </Box>
  )
}

export default AuthorationForgot
