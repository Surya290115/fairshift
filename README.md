# 🤝 FairShift – Decent Work for Every Worker

**SDG 8: Decent Work and Economic Growth**

🔗 **Live demo:** https://surya290115.github.io/fairshift/

## The problem
Construction sites, colleges, hospitals and factories still run on paper
registers and WhatsApp groups. Workers don't know how their pay was
calculated, are afraid to complain, and safety issues go unreported.
Employers only see problems after they become serious.

## Our solution
FairShift makes work fairer, safer and more transparent. It has one
interface for workers and one for employers.

### Worker interface
- **QR check-in:** hours and overtime are calculated automatically.
- **Transparent payslip:** a step-by-step breakdown of how pay was calculated.
- **Complaint and safety reporting:** typed or spoken, with a status the worker can track.
- **Anonymous feedback:** no name is ever saved.
- **Skill passport:** training and certificates that stay with the worker.
- **Fatigue warning:** the worker is told when they have worked too many hours.
- **Languages:** English, Tamil and Hindi, with voice input.

### Employer interface
- Fatigue alerts (11h+ days, 7 days straight, 60h+ weeks)
- Risk-of-leaving score for each employee
- Weekly attendance and overtime overview
- Complaint queue where the employer updates the status
- Anonymous feedback themes

## Works in two industries
| | Construction site | College |
|---|---|---|
| Staff | Masons, helpers, electricians | Lecturers, lab assistants, wardens |
| Overtime rule | 1.5× | 1.25× |
| Feedback topics | Site safety, water and toilets | Workload, timetable, facilities |

The same engine runs both. Switching industries only changes the settings.
Hospitals and factories can be added by creating one new setting.

## How to try it
1. Open the live demo.
2. Pick an industry and a language.
3. As a worker: check in, view your payslip, report an issue, give feedback.
4. Switch to **Employer** to see the alerts, risk scores and complaints.

## Scalability plan
- Cloud database (Supabase or Firebase) in place of browser storage
- Real QR codes and GPS check-in for each site
- WhatsApp and SMS alerts for workers on basic phones
- Voice read-out of payslips for workers who cannot read well
- More languages and industries

## Tech
HTML, CSS and JavaScript only. It runs on low-end phones, works with no
install, and is hosted free on GitHub Pages.

## Limitations (prototype)
Demo data is stored in the browser. QR check-in is simulated.
The risk score is a simple formula, not a trained model.
