import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Input } from '../../components/Input'
import { FileUpload } from '../../components/FileUpload'
import { Select } from '../../components/Select'
import { Checkbox } from '../../components/Checkbox'
import { RadioGroup } from '../../components/RadioGroup'
import { DatePicker } from '../../components/DatePicker'
import { MaskedInput } from '../../components/MaskedInput'
import { AddressForm } from '../../components/AddressForm'
import { membershipFormSchema, type MembershipFormData } from './validation'
import { checkEmailExists, createMember } from '../../services/member'
import * as S from './styles'
import { AnimatePresence, motion } from 'framer-motion'

const maritalStatusOptions = [
  { value: 'Casado Civil', label: 'Casado Civil' },
  { value: 'Casado Civil e Religioso', label: 'Casado Civil e Religioso' },
  { value: 'Divorciado(a)', label: 'Divorciado(a)' },
  { value: 'Solteiro(a)', label: 'Solteiro(a)' },
  { value: 'Viúvo(a)', label: 'Viúvo(a)' }
]

const volunteerOptions = [
  { value: true, label: 'Sim' },
  { value: false, label: 'Não' }
]

const registeredGCs = [
  'GC Embaixadores do Reino - Online',
  'GC Bela Vista',
  'GC Centro I',
  'GC Centro II',
  'GC Centro III',
  'GC Centro IV',
  'GC Cumbica',
  'GC de Casais',
  'GC Delas Centro',
  'GC Delas Vila Galvão',
  'GC Delas - Online',
  'GC Espaço Azul',
  'GC Flôr da Montanha - Casais',
  'GC Gopoúva Casais - Online',
  'GC Jardim Modelo',
  'GC Virtuosas',
  'GC Jardim Pinhal',
  'GC Jardim Presidente Dutra II',
  'GC Jardim Rossi',
  'GC Jardim São João',
  'GC Jurema',
  'GC Legacy',
  'GC Link',
  'GC Misto - Online',
  'GC Mulheres Sábias',
  'GC Ponte Grande',
  'GC Parque Piratininga',
  'GC Parque Primavera',
  'GC Picanço',
  'GC Presidente Dutra',
  'GC Rocket',
  'GC Rocket Braves',
  'GC Rocket Sights',
  'GC Rocket Strongs',
  'GC Jardim Tupinanbá',
  'GC Vila Fátima',
  'GC Vila Silveira',
  'GC Parque Continental II'
]

export function MembershipForm() {
  const methods = useForm<MembershipFormData>({
    resolver: zodResolver(membershipFormSchema),
    mode: 'onBlur' // Validação ocorre ao perder o foco
  })

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = methods

  const belongsToGC = watch('belongsToGC')
  const maritalStatus = watch('maritalStatus')

  const onSubmit = async (data: MembershipFormData) => {
    try {
      await createMember(data)
      toast.success('Ficha de membro cadastrada com sucesso!')
      methods.reset()
    } catch (error) {
      console.error(error)
      if (
        error instanceof Error &&
        error.message === 'Este email já está cadastrado no sistema'
      ) {
        toast.error(error.message)
      } else {
        toast.error('Erro ao cadastrar ficha de membro. Tente novamente.')
      }
    }
  }

  const validateEmail = async (email: string) => {
    try {
      const exists = await checkEmailExists(email)
      if (exists) {
        setError('email', {
          type: 'manual',
          message: 'Este email já está cadastrado no sistema'
        })
        return false // Retorna false para indicar que a validação falhou
      } else {
        clearErrors('email') // Limpa o erro se o e-mail for válido
        return true // Retorna true para indicar que a validação foi bem-sucedida
      }
    } catch (error) {
      console.error('Erro ao validar email:', error)
      return true // Permite continuar em caso de erro na validação
    }
  }

  const showMarriageCertificate =
    maritalStatus === 'Casado Civil' ||
    maritalStatus === 'Casado Civil e Religioso' ||
    maritalStatus === 'Divorciado(a)'

  return (
    <S.Container>
      <S.FormContainer>
        <S.Title>Ficha de Membro</S.Title>
        <FormProvider {...methods}>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nome Completo"
              autoFocus
              {...register('fullName')}
              error={errors.fullName?.message}
            />

            <S.Row>
              <DatePicker
                label="Data de Nascimento"
                value={watch('birthDate') ? new Date(watch('birthDate')) : null}
                onChange={(date) =>
                  setValue('birthDate', date?.toISOString() || '')
                }
                error={errors.birthDate?.message}
                required
                maxDate={new Date()}
              />
              <DatePicker
                label="Data de Batismo"
                value={
                  watch('baptismDate') ? new Date(watch('baptismDate')) : null
                }
                onChange={(date) =>
                  setValue('baptismDate', date?.toISOString() || '')
                }
                error={errors.baptismDate?.message}
                required
                maxDate={new Date()}
              />
            </S.Row>

            <Input
              label="Igreja em que foi batizado"
              {...register('baptismChurch')}
              error={errors.baptismChurch?.message}
            />

            <S.Row>
              <MaskedInput
                label="Telefone"
                mask="(99) 99999-9999"
                placeholder="(00) 00000-0000"
                {...register('phone')}
                error={errors.phone?.message}
                required
              />
              <Input
                label="E-mail"
                type="email"
                {...register('email', {
                  validate: validateEmail, // Validação personalizada
                  onBlur: async (e) => {
                    if (e.target.value) {
                      await validateEmail(e.target.value) // Chama a validação ao perder o foco
                    }
                  }
                })}
                error={errors.email?.message}
              />
            </S.Row>

            <AddressForm />

            <S.Row>
              <Input
                label="Profissão"
                {...register('profession')}
                error={errors.profession?.message}
              />
              <Select
                label="Estado Civil"
                options={maritalStatusOptions}
                {...register('maritalStatus')}
                error={errors.maritalStatus?.message}
              />
            </S.Row>

            <AnimatePresence>
              {showMarriageCertificate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut'
                  }}
                >
                  <FileUpload
                    label="Certidão de Casamento"
                    subtitle="Ou Averbação de Divórcio"
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register('marriageCertificate')}
                    error={errors.marriageCertificate?.message}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <FileUpload
              label="RG ou CNH"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register('identification')}
              error={errors.identification?.message}
            />

            <Input
              label="Quem realizou a sua entrevista pastoral?"
              {...register('pastoralInterviewer')}
              error={errors.pastoralInterviewer?.message}
            />

            <Checkbox label="Pertence ao GC" {...register('belongsToGC')} />

            {belongsToGC && (
              <Select
                label="Selecione o GC"
                options={registeredGCs.map((title) => ({
                  value: title,
                  label: title
                }))}
                {...register('gcName')}
                error={errors.gcName?.message}
              />
            )}

            <RadioGroup
              label="Deseja participar do Giro de Voluntários?"
              options={volunteerOptions}
              value={watch('wantsToVolunteer')}
              onChange={(value) =>
                setValue('wantsToVolunteer', value as boolean)
              }
              error={errors.wantsToVolunteer?.message}
              required
            />

            <S.SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Formulário'}
            </S.SubmitButton>
          </S.Form>
        </FormProvider>
      </S.FormContainer>
    </S.Container>
  )
}
