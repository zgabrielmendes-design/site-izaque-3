'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Sun, Sunset, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })
const selectedFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

export function getDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export type AppointmentTime = '07:00' | '08:00' | '09:00' | '10:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00'

const appointmentSlots: { period: 'morning' | 'afternoon'; label: string; icon: typeof Sun; times: AppointmentTime[] }[] = [
  { period: 'morning', label: 'Manhã', icon: Sun, times: ['07:00', '08:00', '09:00', '10:00'] },
  { period: 'afternoon', label: 'Tarde', icon: Sunset, times: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'] },
]

type AppointmentCalendarProps = {
  bookingsByDay: Record<string, AppointmentTime[]>
  onClose: () => void
  onBook: (date: Date, time: AppointmentTime) => void
}

export function AppointmentCalendar({ bookingsByDay, onClose, onBook }: AppointmentCalendarProps) {
  const [today] = useState(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  })
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<AppointmentTime | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => previouslyFocused?.focus()
  }, [])

  const firstWeekday = (new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay() + 6) % 7
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate()
  const gridLength = Math.ceil((firstWeekday + daysInMonth) / 7) * 7
  const days = Array.from({ length: gridLength }, (_, index) => {
    const dayNumber = index - firstWeekday + 1
    if (dayNumber < 1 || dayNumber > daysInMonth) return null
    return new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), dayNumber)
  })
  const currentKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
  const visibleKey = `${visibleMonth.getFullYear()}-${String(visibleMonth.getMonth() + 1).padStart(2, '0')}`
  const previousMonthDisabled = visibleKey <= currentKey
  const selectedKey = selectedDate ? getDateKey(selectedDate) : null
  const selectedBookings = selectedKey ? bookingsByDay[selectedKey] ?? [] : []

  function changeMonth(offset: number) {
    setSelectedDate(null)
    setSelectedTime(null)
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + offset, 1))
  }

  function handlePanelKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }
    if (event.key !== 'Tab' || !panelRef.current) return

    const focusable = panelRef.current.querySelectorAll<HTMLElement>('button:not(:disabled)')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-title"
      onKeyDown={handlePanelKeyDown}
      initial={{ opacity: 0, y: 26, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-h-[92svh] w-full max-w-[440px] overflow-y-auto rounded-t-[28px] border border-white/[0.09] bg-[#151714] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 shadow-[0_28px_90px_rgba(0,0,0,0.5)] sm:rounded-[28px] sm:px-6"
    >
      <div className="mx-auto mb-5 h-1 w-9 rounded-full bg-white/15 sm:hidden" />
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.17em] text-[#cbb27b]"><CalendarDays size={13} /> Agendamento online</div>
          <h2 id="calendar-title" className="font-serif text-[24px] tracking-[-0.03em]">Escolha um dia</h2>
          <p className="mt-1.5 text-[11px] text-[#a4a39b]">Selecione uma data de segunda a sexta.</p>
        </div>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar calendário" className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/[0.09] text-[#c7c5bc] transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd83]"><X size={16} /></button>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={previousMonthDisabled}
          aria-label="Mês anterior"
          className="flex size-9 items-center justify-center rounded-xl text-[#aaa89f] transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd83]"
        ><ArrowLeft size={16} /></button>
        <h3 aria-live="polite" className="text-[13px] font-medium text-[#f4f1e9]">{monthFormatter.format(visibleMonth)}</h3>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Próximo mês"
          className="flex size-9 items-center justify-center rounded-xl text-[#aaa89f] transition hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd83]"
        ><ArrowRight size={16} /></button>
      </div>

      <div role="group" aria-label={`Calendário de ${monthFormatter.format(visibleMonth)}`} className="grid grid-cols-7 gap-y-1">
        {weekDays.map((day, index) => (
          <div key={day} aria-hidden="true" className="flex h-8 items-center justify-center text-[9px] font-medium uppercase tracking-wide text-[#77786f]">{day}</div>
        ))}
        {days.map((date, index) => {
          if (!date) return <div key={`empty-${index}`} aria-hidden="true" />
          const key = getDateKey(date)
          const isWeekend = date.getDay() === 0 || date.getDay() === 6
          const isPast = date < today
          const bookedPeriods = bookingsByDay[key] ?? []
          const bookingCount = bookedPeriods.length
          const isFull = bookingCount >= 2
          const isSelected = key === selectedKey
          const isToday = key === getDateKey(today)
          const disabled = isWeekend || isPast || isFull
          const unavailableReason = isWeekend ? 'fim de semana' : isPast ? 'data passada' : isFull ? 'dia sem vagas' : ''

          return (
            <div key={key} className="flex items-center justify-center py-0.5">
              <button
                type="button"
                disabled={disabled}
                aria-pressed={isSelected}
                aria-current={isToday ? 'date' : undefined}
                aria-label={`${selectedFormatter.format(date)}${unavailableReason ? `, ${unavailableReason}` : ''}${bookingCount ? `, ${2 - bookingCount} ${2 - bookingCount === 1 ? 'atendimento disponível' : 'atendimentos disponíveis'}` : ', dois atendimentos disponíveis'}`}
                onClick={() => { setSelectedDate(date); setSelectedTime(null) }}
                className={`relative flex size-10 flex-col items-center justify-center rounded-[14px] text-[12px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc98f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#151714] ${
                  isSelected
                    ? 'bg-[#d5bd86] font-semibold text-[#19170f] shadow-[0_3px_14px_rgba(200,170,109,0.2)]'
                    : disabled
                      ? 'cursor-not-allowed text-[#54564f]'
                      : `text-[#e0ded7] hover:bg-white/[0.08] ${isToday ? 'ring-1 ring-[#d5bd86]/55' : ''}`
                }`}
              >
                {date.getDate()}
                {bookingCount > 0 && !isFull && <span aria-hidden="true" className={`absolute bottom-[5px] size-1 rounded-full ${isSelected ? 'bg-[#19170f]/60' : 'bg-[#d5bd86]'} `} />}
                {isFull && <span className="absolute bottom-[5px] h-px w-3 bg-[#77786f]" />}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-[10px] text-[#85867d]">
        <span className="flex size-5 items-center justify-center rounded-full border border-[#d5bd86]/45 text-[#d5bd86]"><Clock3 size={10} /></span>
        <span>Máximo de 2 atendimentos por dia</span>
        <span className="ml-auto flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[#d5bd86]" /> Disponível</span>
      </div>

      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div key={selectedKey} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-3">
              <div><p className="text-[9px] uppercase tracking-[0.12em] text-[#8e8d84]">Data selecionada</p><p className="mt-1 text-[11px] font-medium text-[#eeece5]">{selectedFormatter.format(selectedDate)}</p></div>
              <span className="rounded-full bg-[#d5bd86]/10 px-2.5 py-1 text-[9px] text-[#ddc890]">{2 - selectedBookings.length} {2 - selectedBookings.length === 1 ? 'atendimento restante' : 'atendimentos restantes'}</span>
            </div>
            <p className="mb-3 mt-4 text-[10px] font-medium text-[#c7c5bc]">Escolha um horário</p>
            <div className="flex flex-col gap-4">
              {appointmentSlots.map(({ period, label, icon: PeriodIcon, times }) => (
                <section key={period} aria-label={`Horários da ${label.toLowerCase()}`}>
                  <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-[#a9a79e]"><PeriodIcon size={13} className="text-[#d5bd86]" /> {label}</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {times.map((time) => {
                      const isBooked = selectedBookings.includes(time)
                      const isSelected = selectedTime === time
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBooked || selectedBookings.length >= 2}
                          aria-pressed={isSelected}
                          aria-label={`${time}${isBooked ? ', já reservado' : selectedBookings.length >= 2 ? ', limite diário atingido' : ', disponível'}`}
                          onClick={() => setSelectedTime(time)}
                          className={`flex min-h-[42px] items-center justify-center rounded-xl border text-[11px] font-medium tabular-nums transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfc98f] ${isSelected ? 'border-[#d5bd86]/65 bg-[#d5bd86]/10 text-[#f1dfb2]' : isBooked || selectedBookings.length >= 2 ? 'cursor-not-allowed border-white/[0.05] bg-white/[0.02] text-[#686960]' : 'border-white/[0.09] text-[#d4d1c9] hover:border-[#d5bd86]/35 hover:bg-white/[0.05]'}`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
            <button type="button" onClick={() => { if (selectedTime) onBook(selectedDate, selectedTime) }} disabled={!selectedTime || selectedBookings.includes(selectedTime) || selectedBookings.length >= 2} className="mt-4 flex min-h-[49px] w-full items-center justify-center gap-2 rounded-2xl bg-[#d5bd86] text-[12px] font-semibold text-[#19170f] transition hover:bg-[#e1cf9e] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151714]">
              <Check size={15} /> Confirmar dia e horário
            </button>
            <p className="mt-3 text-center text-[9px] leading-relaxed text-[#75766e]">Demonstração: as reservas não são salvas nem compartilhadas entre visitantes.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
