import { useState } from 'react'
import { registrationSchema, type RegistrationData } from './registrationSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function RegistrationFormLesson() {
  const [submittedData, setSubmittedData] = useState<RegistrationData | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { fullName: '', email: '', learningGoal: '' },
  })

  function handleValidSubmit(data: RegistrationData) {
    setSubmittedData(data)
    reset()
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <section className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <h3 className="font-semibold text-blue-950">Alur resolver</h3>
        <pre className="mt-3 overflow-x-auto text-sm leading-6 text-blue-900">
          <code>{`register mengumpulkan data
        ↓
handleSubmit dijalankan
        ↓
zodResolver memanggil schema
        ↓
errors atau valid data`}</code>
        </pre>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form
          onSubmit={handleSubmit(handleValidSubmit)}
          className="mt-5 max-w-xl space-y-4"
          noValidate
        >
          <div>
            <label
              htmlFor="resolver-full-name"
              className="mb-1.5 block text-sm font-semibold"
            >
              Nama Lengkap
            </label>
            <input
              id="resolver-full-name"
              type="text"
              {...register('fullName')}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? 'resolver-full-name-error' : undefined
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-600"
            />
            {errors.fullName?.message && (
              <p
                role="alert"
                id="resolver-full-name-error"
                className="mt-2 text-sm text-red-700"
              >
                Error : {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="resolver-email"
              className="mb-1.5 block text-sm font-semibold"
            >
              Email{' '}
            </label>
            <input
              id="resolver-email"
              type="email"
              {...register('email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? 'resolver-email-error' : undefined
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-600"
            />
            {errors.email?.message && (
              <p
                role="alert"
                id="resolver-full-name-error"
                className="mt-2 text-sm text-red-700"
              >
                Error : {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="resolver-learning-goal"
              className="mb-1.5 block text-sm font-semibold"
            >
              Email{' '}
            </label>
            <textarea
              id="resolver-learning-goal"
              rows={3}
              {...register('learningGoal')}
              aria-invalid={Boolean(errors.learningGoal)}
              aria-describedby={
                errors.learningGoal ? 'basic-learningGoal-error' : undefined
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-600"
            />
            {errors.learningGoal?.message && (
              <p
                role="alert"
                id="basic-full-name-error"
                className="mt-2 text-sm text-red-700"
              >
                Error : {errors.learningGoal.message}
              </p>
            )}
          </div>

          <button className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
            {isSubmitting ? 'Memeriksa...' : 'Validasi dan kirim'}
          </button>
        </form>

        {submittedData && isSubmitSuccessful && (
          <div
            className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4"
            aria-live="polite"
          >
            <p
              className="bg-emerald-50 p-4 font-semibold text-green-800"
              aria-live="polite"
            >
              Data lolos schema
            </p>
            <pre className="mt-3 overflow-x-auto text-sm text-emerald-950">
              <code>{JSON.stringify(submittedData, null, 2)}</code>
            </pre>
          </div>
        )}
      </section>
    </article>
  )
}
