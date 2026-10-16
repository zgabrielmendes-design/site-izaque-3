'use client'

import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  Landmark,
  MapPin,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { AppointmentCalendar, getDateKey, type AppointmentTime } from '@/components/appointment-calendar'

const officeWhatsAppNumber = '5567992663032'
const officeAddress = 'Rua São Luís, 364 - Jardim Imá'
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(officeAddress)}`
const whatsappUrl = 'https://wa.me/5567992663032?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20a%20IM%20Advogados.'

export function BioSite() {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [bookingsByDay, setBookingsByDay] = useState<Record<string, AppointmentTime[]>>({})
  const [confirmedAppointment, setConfirmedAppointment] = useState<{ date: Date; time: AppointmentTime } | null>(null)
  const confirmedDateLabel = confirmedAppointment?.date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const confirmedTimeLabel = confirmedAppointment?.time
  const confirmationMessage = confirmedAppointment
    ? encodeURIComponent(`Olá! O atendimento jurídico foi confirmado para ${confirmedDateLabel}, às ${confirmedTimeLabel}.`)
    : ''
  const confirmationWhatsAppUrl = `https://wa.me/${officeWhatsAppNumber}?text=${confirmationMessage}`

  function handleBooking(date: Date, time: AppointmentTime) {
    const key = getDateKey(date)
    setBookingsByDay((current) => ({
      ...current,
      [key]: [...(current[key] ?? []), time],
    }))
    setConfirmedAppointment({ date, time })
    setCalendarOpen(false)
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-svh bg-[#090b0a] px-0 py-0 text-[#f5f3ee] sm:flex sm:items-start sm:justify-center sm:px-6 sm:py-8">
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto min-h-svh w-full max-w-[440px] overflow-hidden bg-[#101210] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:min-h-0 sm:rounded-[32px] sm:border sm:border-white/[0.08]"
        >
          <header className="relative h-[234px] overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              poster="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85"
              className="absolute inset-0 size-full object-cover object-center opacity-70"
            >
              <source
                src="https://videos.pexels.com/video-files/5664883/5664883-hd_1920_1080_30fps.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d0b]/55 via-[#0b0d0b]/35 to-[#101210]" />
            <div className="relative z-10 flex items-center justify-between px-6 pt-6">
              <a href="#inicio" aria-label="IM Advogados — início" className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl border border-[#d2b879]/35 bg-black/20 text-[#e3cc94]">
                  <Landmark size={17} strokeWidth={1.6} />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.19em] text-white/90">IM <span className="font-normal text-white/55">ADVOGADOS</span></span>
              </a>
            </div>
            <div className="absolute bottom-[34px] left-6 z-10">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.45 }}
                className="mb-2 text-[10px] font-medium uppercase tracking-[0.23em] text-[#e3cc94]"
              >
                Confiança para seguir em frente
              </motion.p>
              <h1 className="max-w-[295px] font-serif text-[28px] leading-[1.13] tracking-[-0.035em] text-white">
                Direito com clareza. <span className="italic text-[#e4d1a5]">Estratégia com propósito.</span>
              </h1>
            </div>
          </header>

          <section id="inicio" className="relative px-6 pb-8">
            <div className="relative z-20 -mt-[34px] mb-4 flex flex-col items-center gap-3">
              <div className="flex size-[78px] items-center justify-center overflow-hidden rounded-full border-[3px] border-[#101210] bg-[#26251f] shadow-[0_8px_28px_rgba(0,0,0,0.4)]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-14%20at%2018.59.25-VokLPVDSurKHXgofvSuetlf2MOnJCq.jpeg"
                  alt="Retrato do advogado da IM Advogados com terno escuro e óculos"
                  className="size-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d5bd86]/20 bg-[#d5bd86]/[0.08] px-3 py-1.5 text-[10px] font-medium tracking-wide text-[#e5d2a6]">
                <ShieldCheck size={12} /> Atendimento personalizado
              </span>
            </div>

            <div className="mb-6 text-center">
              <h2 className="font-serif text-[26px] leading-tight tracking-[-0.03em]">IM Advogados</h2>
              <p className="mx-auto mt-2 max-w-[350px] text-[13px] leading-[1.75] text-[#a8a69e]">
                Orientação jurídica próxima e estratégica. Um escritório comprometido em transformar questões complexas em caminhos mais claros.
              </p>
            </div>

            <nav aria-label="Links rápidos" className="mb-7 grid grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[58px] items-center justify-between rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 transition hover:border-[#d5bd86]/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd83]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#d5bd86]/10"><img src="https://thesvg.org/icons/whatsapp/default.svg" alt="" aria-hidden="true" className="size-[19px] object-contain" /></span>
                  <span className="text-left"><span className="block text-[12px] font-medium">WhatsApp</span><span className="mt-0.5 block text-[10px] text-[#97958e]">Tire suas dúvidas</span></span>
                </span>
                <ArrowDownRight size={15} className="text-[#85847e] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://www.instagram.com/_izaquemendes/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[58px] items-center justify-between rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 transition hover:border-[#d5bd86]/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd83]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#d5bd86]/10"><img src="https://thesvg.org/icons/instagram/default.svg" alt="" aria-hidden="true" className="size-[19px] object-contain" /></span>
                  <span className="text-left"><span className="block text-[12px] font-medium">Instagram</span><span className="mt-0.5 block text-[10px] text-[#97958e]">Acompanhe por lá</span></span>
                </span>
                <ArrowDownRight size={15} className="text-[#85847e] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </nav>

            <section aria-labelledby="booking-heading" className="relative overflow-hidden rounded-[24px] border border-[#d5bd86]/25 bg-[linear-gradient(145deg,rgba(213,189,134,0.12),rgba(213,189,134,0.025)_55%,rgba(255,255,255,0.02))] p-5">
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-[#b99c61]/[0.08] blur-3xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex size-9 items-center justify-center rounded-xl border border-[#d5bd86]/20 bg-[#d5bd86]/10 text-[#e1ca91]"><CalendarDays size={17} /></div>
                  <h2 id="booking-heading" className="font-serif text-[20px] tracking-[-0.02em]">Vamos conversar?</h2>
                  <p className="mt-1.5 max-w-[190px] text-[11px] leading-[1.65] text-[#a8a69e]">Escolha um dia útil para dar o primeiro passo.</p>
                </div>
                <div className="mt-1 flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.08] bg-black/15 px-2.5 py-1.5 text-[9px] text-[#b5b2a8]"><Clock3 size={11} /> Seg–Sex</div>
              </div>
              <AnimatePresence mode="wait">
                {confirmedAppointment ? (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="relative mt-5 rounded-2xl border border-emerald-200/15 bg-emerald-300/[0.07] p-3.5"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-200/15 text-emerald-200"><Check size={12} /></span>
                      <div><p className="text-[12px] font-medium text-emerald-100">Atendimento selecionado</p><p className="mt-1 text-[10px] text-emerald-100/70">{confirmedDateLabel}, às {confirmedTimeLabel}.</p></div>
                    </div>
                    <a href={confirmationWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#d5bd86] px-3 text-[11px] font-semibold text-[#19170f] transition hover:bg-[#e1cf9e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                      Avisar o escritório pelo WhatsApp <ExternalLink size={13} />
                    </a>
                    <p className="mt-2 text-center text-[9px] leading-relaxed text-emerald-100/60">A mensagem abrirá pronta no WhatsApp. Toque em enviar para confirmar com o escritório.</p>
                    <button type="button" onClick={() => setCalendarOpen(true)} className="mt-3 pl-[30px] text-[10px] font-medium text-[#e3cc94] underline decoration-[#e3cc94]/40 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd83]">Escolher outro dia ou período</button>
                  </motion.div>
                ) : (
                  <motion.button
                    key="book"
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    onClick={() => setCalendarOpen(true)}
                    className="group relative mt-5 flex min-h-[52px] w-full items-center justify-between rounded-2xl bg-[#d5bd86] px-4 text-left text-[#18160f] shadow-[0_8px_24px_rgba(180,149,83,0.14)] transition hover:bg-[#e1cf9e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#171714] active:scale-[0.99]"
                  >
                    <span className="flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.005em]"><Sparkles size={15} /> Agendar atendimento jurídico</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>
                )}
              </AnimatePresence>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="relative mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] text-[11px] font-medium text-[#d8d5cc] transition hover:border-[#d5bd86]/35 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6bd83]">
                <MapPin size={14} className="text-[#d5bd86]" /> Como chegar ao escritório <ExternalLink size={12} className="text-[#9b998f]" />
              </a>
              <div className="relative mt-3 flex items-center justify-center gap-1.5 text-[9px] text-[#939188]"><LockKeyhole size={10} /> Atendimento reservado e confidencial</div>
            </section>

          </section>
        </motion.article>

        <AnimatePresence>
          {calendarOpen && (
            <motion.div
              key="calendar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(event) => { if (event.target === event.currentTarget) setCalendarOpen(false) }}
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 px-0 backdrop-blur-[3px] sm:items-center sm:px-4"
            >
              <AppointmentCalendar
                bookingsByDay={bookingsByDay}
                onClose={() => setCalendarOpen(false)}
                onBook={handleBooking}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  )
}
