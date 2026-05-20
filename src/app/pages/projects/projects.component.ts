import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PhotoProject {
  id: string;
  category: string;
  title: string;
  client: string;
  location: string;
  cap: string;
  image: string;
  featured?: boolean;
}

interface ListProject {
  title: string;
  client: string;
  state: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  photoProjects: PhotoProject[] = [
    { id: '1', featured: true, cap: '170 MLD',
      category: 'Water Treatment Plant · Telangana',
      title: '170 MLD WTP — Warangal, Telangana',
      client: 'Telangana Water Grid Department via M/S Megha Engineering & Infrastructures Ltd., Hyderabad',
      location: 'Warangal, Telangana',
      image: 'wtp-170mld-warangal.jpg' },
    { id: '2', cap: '130 MLD',
      category: 'Water Treatment Plant · Odisha',
      title: '130 MLD WTP — Bhubaneswar (Aerial)',
      client: 'Watco Division-I, Bhubaneswar via LC Infra Projects Pvt. Ltd.',
      location: 'Bhubaneswar, Odisha',
      image: 'wtp-130mld-bhubaneswar-aerial.jpg' },
    { id: '3', cap: '130 MLD',
      category: 'Water Treatment Plant · Odisha',
      title: '130 MLD WTP — Bhubaneswar (Night View)',
      client: 'EPC Contract incl. O&M for 5 Years via LC Infra Projects Pvt. Ltd.',
      location: 'Bhubaneswar, Odisha',
      image: 'wtp-130mld-bhubaneswar-night.jpg' },
    { id: '4', cap: 'Intake Well',
      category: 'Intake Well · Odisha',
      title: '130 MLD Intakewell — Bhubaneswar',
      client: 'Part of 130 MLD WTP Package, Watco Division-I, Bhubaneswar',
      location: 'Bhubaneswar, Odisha',
      image: 'wtp-130mld-intakewell.jpg' },
    { id: '5', featured: true, cap: '84 MLD',
      category: 'Water Treatment Plant · Andhra Pradesh',
      title: '84 MLD WTP — Uddanam, Srikakulam',
      client: 'RWSSD Govt. of Andhra Pradesh via M/S Megha Engineering & Infrastructures Ltd., Hyderabad',
      location: 'Uddanam, Srikakulam District, A.P.',
      image: 'wtp-84mld-uddanam.jpg' },
    { id: '6', cap: '84 MLD',
      category: 'Water Treatment Plant · Andhra Pradesh',
      title: '84 MLD WTP — Uddanam (View 2)',
      client: 'RWSSD Govt. of Andhra Pradesh via MEIL, Hyderabad',
      location: 'Srikakulam, Andhra Pradesh',
      image: 'wtp-84mld-uddanam-2.jpg' },
    { id: '7', cap: '65 MLD',
      category: 'Water Treatment Plant · Andhra Pradesh',
      title: '65 MLD WTP — Pulivendula, YSR Kadapa',
      client: 'RWSSD Govt. of Andhra Pradesh via M/S MEIL',
      location: 'Pulivendula, YSR Kadapa Dist., A.P.',
      image: 'wtp-65mld-pulivendula.jpg' },
    { id: '8', cap: '39 MLD',
      category: 'Water Treatment Plant · Punjab',
      title: '39 MLD WTP — Patiala, Punjab',
      client: 'Patiala & Fatehgarh Sahib Water Supply System via KNK-JWIL JV',
      location: 'Patiala District, Punjab',
      image: 'wtp-39mld-patiala.jpg' },
    { id: '9', cap: '18 MLD',
      category: 'Water Treatment Plant · Punjab',
      title: '18 MLD WTP — Patiala, Punjab',
      client: 'Surface Water Based System, 120-month O&M via KNK-JWIL JV',
      location: 'Patiala District, Punjab',
      image: 'wtp-18mld-patiala.jpg' },
    { id: '10', cap: '12 MLD',
      category: 'Water Treatment Plant · Punjab',
      title: '12 MLD WTP — Patiala, Punjab',
      client: 'Part of Patiala & Fatehgarh Sahib Water Supply Package via KNK-JWIL JV',
      location: 'Patiala District, Punjab',
      image: 'wtp-12mld-patiala.jpg' },
    { id: '11', cap: 'Canal',
      category: 'Pipe Networking · Punjab',
      title: 'Indira Gandhi Canal Crossing — Patiala',
      client: 'Aerial pipeline crossing of Indira Gandhi Canal via KNK-JWIL JV',
      location: 'Patiala, Punjab',
      image: 'canal-crossing-patiala.jpg' },
    { id: '12', cap: 'Pipeline',
      category: 'Pipe Networking · Goa',
      title: 'Pipe Laying — Latambarcem, Goa',
      client: 'Water Supply Improvement — Sal & Latambarcem Villages, Bicholim via K.N.K. Projects Pvt. Ltd.',
      location: 'Latambarcem, North Goa',
      image: 'pipe-laying-goa.jpg' }
  ];

  wtpList: ListProject[] = [
    { title: '170 MLD WTP — Filter House Design, Telangana Water Grid', client: 'M/S Megha Engineering & Infrastructures Ltd., Hyderabad', state: 'Telangana' },
    { title: '158 MLD WTP — Fixed Intake Jetty & Pump House, Surface Based Water Supply, Purulia', client: 'Public Health Engineering Directorate, Govt. of West Bengal via Gaja Engineering Pvt. Ltd.', state: 'West Bengal' },
    { title: '130 MLD WTP — Multi Villages Water Supply Scheme, Machagora, Chhindwara', client: 'Madhya Pradesh Jal Nigam via LC Infra Projects Pvt. Ltd.', state: 'M.P.' },
    { title: '122 MLD WTP — AP Urban Water Supply & Septage Management, Nellore', client: 'Govt. of A.P., Public Health & Municipal Engineering Dept. via M/S MEIL', state: 'Andhra Pradesh' },
    { title: '95 MLD WTP — Sullurupeta & 16 Mandals, SPSR Nellore District', client: 'M/S Megha Engineering & Infrastructures Ltd. (MEIL)', state: 'Andhra Pradesh' },
    { title: '90 MLD WTP — Prayagraj Rural Surface Water Supply Scheme', client: 'Gaja Engineering Pvt. Ltd.', state: 'Uttar Pradesh' },
    { title: '77 MLD WTP — Filter House Design, Telangana Water Grid', client: 'M/S Megha Engineering & Infrastructures Ltd., Hyderabad', state: 'Telangana' },
    { title: '63.05 MLD WTP — Rural Piped Water Supply, Gajapati & Kandhamal (3 Nos.), 5-Yr O&M EPC', client: 'Kalpataru Power Transmission Ltd. (JMC-SPML JV) & JMC–SPML JV', state: 'Odisha' },
    { title: '60 MLD WTP — Telangana Water Grid Department', client: 'M/S Salient Projects, Hyderabad', state: 'Telangana' },
    { title: '58 MLD WTP — Kalburgi City 24×7 Pressurized Water Supply', client: 'M/S L&T Construction', state: 'Karnataka' },
    { title: '53 MLD WTP — AP Urban Water Supply (Guntur Municipal Corporation)', client: 'M/S MEIL', state: 'Andhra Pradesh' },
    { title: '50 MLD WTP — Dholera, Gujarat (Pure Water Transmission Line & IBPS)', client: 'SPML Infra Ltd. on behalf of Mars', state: 'Gujarat' },
    { title: '42 MLD WTP — Pullivendula, YSR Kadapa, Drinking Water Supply', client: 'RWSSD Govt. of Andhra Pradesh via M/S MEIL', state: 'Andhra Pradesh' },
    { title: '35 MLD WTP — Filter House Design, Telangana Water Grid', client: 'M/S GVPR Engineers Ltd., Hyderabad', state: 'Telangana' },
    { title: '32 MLD WTP — Manthinibhopalpully Segment, Telangana Water Grid', client: 'M/S Megha Engineering & Infrastructures Ltd.', state: 'Telangana' },
    { title: '30 MLD WTP (2 Nos.) — UWSS Bikaner Augmentation & Expansion, Pkg-1', client: 'M/S SMCIPL-VUBEPL JV', state: 'Rajasthan' },
    { title: '25 MLD WTP — Salaiyya Nathupura Group Village Water Supply, Mahoba (10-Yr O&M)', client: 'Madhya Pradesh via JMC Projects (India) Ltd.', state: 'M.P.' },
    { title: '21.5 MLD WTP — Shikaripada Detailed Survey, Design & Drawing, Dumka', client: 'Executive Engineer, Drinking Water & Sanitation, Dumka via Kalpataru (JMC-SPML JV)', state: 'Jharkhand' },
    { title: '20 MLD WTP — Telangana Water Grid Department', client: 'M/S Salient Projects, Hyderabad', state: 'Telangana' },
    { title: '18 MLD WTP — Yemigunur Municipal, Kurnool District', client: 'M/S MEIL', state: 'Andhra Pradesh' },
    { title: '17.66 MLD WTP — Nilagiri Block, Balasore District (5-Yr O&M)', client: 'ZECPL', state: 'Odisha' },
    { title: '17 MLD WTP (Intake Well, WTP, Pump Houses & ESR 1800 KL) — Barbil ULB', client: 'Watco Orissa – ZECPL', state: 'Odisha' },
    { title: '17 MLD WTP — Sonepur, Dunguripali & Binikablock (5-Yr O&M)', client: 'ZECPL', state: 'Odisha' },
    { title: '17 MLD WTP — Mayurbanj & Sukruli Block Rural PWS (2 Nos.)', client: 'ZECPL', state: 'Odisha' },
    { title: '16.95 MLD WTP — Narshingpur, Cuttack/Jagatsinghpur Rural PWS', client: 'M/S L&T Construction', state: 'Odisha' },
    { title: '16.44 MLD WTP — Badamba, Cuttack/Jagatsinghpur Rural PWS', client: 'M/S L&T Construction', state: 'Odisha' },
    { title: '15.70 + 13.10 + 8 MLD WTP — 3 Mega PWS, Koraput District (5-Yr O&M)', client: 'Kalpataru Power Transmission Ltd. (JMC-SPML JV)', state: 'Odisha' },
    { title: '15 MLD WTP — Alternate Gravity Water Supply Scheme, Aizawl', client: 'Public Health Engineering Dept., Mizoram via KIPL-VA JV', state: 'Mizoram' },
    { title: '13.5 + 10.5 MLD WTP — 2 Mega PWS, Podia & Korkunda, Malkangiri (5-Yr O&M)', client: 'M/S KEC – Kaveri Joint Venture', state: 'Odisha' },
    { title: '11 MLD WTP — Atmakur Municipal, Kurnool Dist.', client: 'M/S MEIL', state: 'Andhra Pradesh' },
    { title: '11 MLD WTP — Nandikotkur Municipal, Kurnool Dist.', client: 'M/S MEIL', state: 'Andhra Pradesh' },
    { title: '11 MLD WTP — Bhishma Cuttack, Rayagada District (5-Yr O&M)', client: 'ZECPL', state: 'Odisha' },
    { title: '10 MLD Pressure Filtration Plants — Dhumacem, Sal & Latambarcem, Bicholim', client: 'P.W.D. Division XXIV(WS), Bicholim, Goa via K.N.K. Projects Pvt. Ltd.', state: 'Goa' },
    { title: '10 MLD WTP — Gunpur, Rayagada District (5-Yr O&M)', client: 'ZECPL', state: 'Odisha' },
    { title: '7.75 MLD WTP — Halali Dam Multi Village Water Supply (Jal Jeevan Mission)', client: 'IT-DCC (JV)', state: 'M.P.' },
    { title: '6 MLD WTP — AP Urban Water Supply (Vinukonda Municipal)', client: 'M/S MEIL', state: 'Andhra Pradesh' },
    { title: '4.5 MLD WTP — Kota, Public Health Department (Supervision)', client: 'M/S GKC Projects Ltd., Hyderabad', state: 'Rajasthan' },
    { title: 'Multi Village Scheme — Kumhiguda (Intake Wells, WTPs, ESR) — Jal Jeevan Mission', client: 'Office of Executive Engineer, JJM Raipur via GKR Infracon (India) Pvt. Ltd.', state: 'Chhattisgarh' },
    { title: 'Water Supply Projects — 30 ULBs, Augmentation Bhuban NAC (AMRUT 2.0 SWAP-II)', client: 'Superintending Engineer, PH Division, Angul via M/S MA Construction', state: 'Odisha' },
    { title: 'Water Supply — Khajuwala Constituency, Bikaner District (10-Yr O&M)', client: 'Govt. of Rajasthan, PHED via M/S BRCPPL-OMIL-DARA (JV)', state: 'Rajasthan' },
    { title: 'Kansumra Masithiya RWSS — Narmada NC-18 Pipeline (ESR & Pipeline)', client: 'LC Infra on Behalf of Artika', state: 'Gujarat' },
    { title: 'RPWS — Belpada Village, Bolangir District (5-Yr O&M)', client: 'R.W.S.S. Organisation, Govt. of Odisha via MA Construction, Dhanbad', state: 'Odisha' }
  ];

  stpList: ListProject[] = [
    { title: '35 MLD STP — C-Tech Technology, Kurnool (Design, Build, O&M)', client: 'A.P. Public Health & Municipal Engineering Dept. via KIPL-EIPPL JV', state: 'Andhra Pradesh' },
    { title: '35 MLD STP — Designing, Constructing, Commissioning & O&M, Kurnool', client: 'Kurnool, Andhra Pradesh', state: 'Andhra Pradesh' },
    { title: '30 MLD STP — Gorakhpur Sewerage Scheme Zone C-Part-2 (AMRUT 2.0)', client: 'Uttar Pradesh Jal Nigam (Urban), Gorakhpur', state: 'Uttar Pradesh' },
    { title: 'Rejuvenation — Gordhaiya Nala & Ramgarhtal Lake (I&D and Treatment, AMRUT 2.0)', client: 'Uttar Pradesh Jal Nigam (Urban), Gorakhpur', state: 'Uttar Pradesh' },
    { title: '9.5 MLD STP — SBR C-Tech Technology, Neemuch', client: 'PC Snehal, Ahmedabad', state: 'M.P.' },
    { title: '7 MLD STP — SBR C-Tech Technology, Neemuch', client: 'PC Snehal, Ahmedabad', state: 'M.P.' },
    { title: 'Sewerage in 3 ULBs — AMRUT 2.0 (Adilabad, Karimnagar, Warangal) — 1 MLD STP×2, 1.5 MLD×1, 23 MLD×1, 5 MLD×1, 6 MLD×1, 4 MLD×1', client: 'Package-I, Telangana PH Division', state: 'Telangana' }
  ];

  liftList: ListProject[] = [
    { title: 'NMC Based Lift Irrigation M.S. Pipeline — Bhasariya to Sametra, 50 Cusecs (Adundra to Sujlam Suflam Spreading Canal, Kherava)', client: 'SPML Infra Ltd.', state: 'Gujarat' }
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement?.children || []);
          const delay = Math.min(siblings.indexOf(e.target as Element) * 60, 400);
          setTimeout(() => e.target.classList.add('visible'), delay);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => this.observer?.observe(el));
    }, 0);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const placeholder = img.nextElementSibling as HTMLElement;
    if (placeholder) placeholder.style.display = 'flex';
  }
}
