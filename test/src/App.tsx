import { useState, useEffect } from 'react'
import * as Icons from './components/Icons'
import './App.css'

interface Project {
  id: number
  title: string
  category: 'kitchen' | 'wardrobe' | 'livingroom' | 'other'
  categoryName: string
  desc: string
  fullDesc: string
  price: string
  size: string
  timeline: string
  materials: string
  image: string
}

function App() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [successToast, setSuccessToast] = useState<boolean>(false)
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'kitchen',
    comment: ''
  })
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Handle Scroll to add active state to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-hide success toast
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => {
        setSuccessToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successToast])

  // Portfolio items data
  const projects: Project[] = [
    {
      id: 1,
      title: 'Кухня "Gold & Oak"',
      category: 'kitchen',
      categoryName: 'Кухни',
      desc: 'Премиальная кухня с фасадами из натурального дуба и матовыми золотыми акцентами.',
      fullDesc: 'Изысканный кухонный гарнитур, разработанный по индивидуальному заказу. Фасады выполнены из шпона премиального темного дуба в комбинации с золотым напылением. Столешница и кухонный остров изготовлены из редкого итальянского мрамора Calacatta Gold с теплыми золотистыми прожилками.',
      price: 'от 1 200 000 ֏',
      size: '4.6 п.м.',
      timeline: '35 дней',
      materials: 'Шпон дуба, МДФ эмаль, мрамор Calacatta, фурнитура Blum Legrabox',
      image: '/images/kitchen.svg'
    },
    {
      id: 2,
      title: 'Гардеробная "Walk-In Luxe"',
      category: 'wardrobe',
      categoryName: 'Гардеробные',
      desc: 'Просторная гардеробная с тонированным стеклом и скрытой теплой LED-подсветкой.',
      fullDesc: 'Роскошная закрытая гардеробная комната. Конструкция из массива ясеня и тонированного графитового стекла в алюминиевом золотом профиле. Каждая секция оснащена автоматической подсветкой при открывании дверей и выдвижными органайзерами для аксессуаров.',
      price: 'от 980 000 ֏',
      size: '8.4 кв.м.',
      timeline: '25 дней',
      materials: 'Массив ясеня, алюминиевый профиль, тонированное стекло, подсветка Hafele',
      image: '/images/wardrobe.svg'
    },
    {
      id: 3,
      title: 'Гостиная "Slate & Gold"',
      category: 'livingroom',
      categoryName: 'Гостиные',
      desc: 'Стеновая панель из темного сланца со встроенной ТВ-консолью и латунными вставками.',
      fullDesc: 'Инновационная зона отдыха для гостиной. Сочетание широкоформатного сланцевого шпона, шпона американского ореха и шлифованной латуни ручной работы. Встроенный биокамин и скрытая кабельная система обеспечивают максимальный комфорт и чистый минималистичный вид.',
      price: 'от 750 000 ֏',
      size: '5.2 п.м.',
      timeline: '30 дней',
      materials: 'Каменный шпон, Американский орех, натуральная латунь, биокамин',
      image: '/images/livingroom.svg'
    },
    {
      id: 4,
      title: 'Спальня "Royal Comfort"',
      category: 'other',
      categoryName: 'Спальни',
      desc: 'Кровать с парящим эффектом и высокими мягкими стеновыми панелями из замши.',
      fullDesc: 'Королевское спальное ложе с уникальным парящим основанием. Высокое изголовье из мягких замшевых панелей теплого кофейного цвета со вставками из золотого зеркала. Интегрированные прикроватные тумбы со столешницами из закаленного стекла.',
      price: 'от 850 000 ֏',
      size: '2.0 × 2.2 м',
      timeline: '20 дней',
      materials: 'Итальянская замша, каркас из бука, золотое зеркало, фурнитура Hettich',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      title: 'Кабинет "Executive Wood"',
      category: 'other',
      categoryName: 'Кабинеты',
      desc: 'Массивный рабочий стол из ореха и библиотека со стеклянными витринами.',
      fullDesc: 'Эксклюзивный домашний офис для руководителей. Рабочий стол выполнен из цельного слэба американского ореха с заливкой прозрачной эпоксидной смолой. Шкафы-витрины оборудованы умными замками и специальной винной секцией с температурным контролем.',
      price: 'от 1 100 000 ֏',
      size: '12.0 кв.м.',
      timeline: '28 дней',
      materials: 'Слэб ореха, эпоксидная смола, МДФ эмаль, умная фурнитура',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      title: 'Ванная тумба "Aura Stone"',
      category: 'other',
      categoryName: 'Ванные комнаты',
      desc: 'Подвесная тумба из влагостойкого тика со столешницей из литьевого золотого мрамора.',
      fullDesc: 'Премиальная подвесная мебель для ванной. Изготовлена из натурального бирманского тика со специальной водоотталкивающей пропиткой. Интегрированная раковина и столешница выполнены по бесшовной технологии из высокопрочного литьевого мрамора.',
      price: 'от 450 000 ֏',
      size: '1.6 п.м.',
      timeline: '18 дней',
      materials: 'Бирманский тик, литьевой мрамор, скрытый крепеж скрытого монтажа',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  // Validation
  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) tempErrors.name = 'Пожалуйста, введите ваше имя'
    
    // Russian/Armenian phone validation: simple check
    const phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,14}$/
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Пожалуйста, введите номер телефона'
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Неверный формат номера'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      tempErrors.email = 'Неверный формат email'
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // Submit estimate form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Calculation request submitted successfully:', formData)
      setSuccessToast(true)
      // Reset Form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'kitchen',
        comment: ''
      })
      setErrors({})
    }
  }

  // Scroll Helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Background Glowing spots */}
      <div className="glow-spot glow-spot-1"></div>
      <div className="glow-spot glow-spot-2"></div>

      {/* HEADER / NAVIGATION */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-wrapper">
          <a href="#" className="logo-container" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}) }}>
            <div className="logo-icon">A</div>
            <div>
              <span className="logo-text">AURA</span>
              <span className="logo-tagline">Premium Furniture</span>
            </div>
          </a>

          <nav>
            <ul className="nav-links">
              <li><a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>О нас</a></li>
              <li><a href="#catalog" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('catalog') }}>Портфолио</a></li>
              <li><a href="#pricing" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('pricing') }}>Услуги</a></li>
              <li><a href="#contacts" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contacts') }}>Контакты</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a href="tel:+37499999999" className="btn btn-outline-gold" style={{ padding: '8px 18px', fontSize: '14px' }}>
              <Icons.Phone size={16} color="var(--gold-light)" />
              <span>+374 99 999999</span>
            </a>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <Icons.X size={26} /> : <Icons.Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-drawer-links">
          <li><a href="#about" className="mobile-drawer-link" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>О нас</a></li>
          <li><a href="#catalog" className="mobile-drawer-link" onClick={(e) => { e.preventDefault(); scrollToSection('catalog') }}>Портфолио</a></li>
          <li><a href="#pricing" className="mobile-drawer-link" onClick={(e) => { e.preventDefault(); scrollToSection('pricing') }}>Услуги</a></li>
          <li><a href="#contacts" className="mobile-drawer-link" onClick={(e) => { e.preventDefault(); scrollToSection('contacts') }}>Контакты</a></li>
        </ul>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a href="tel:+37499999999" className="btn btn-secondary" style={{ width: '100%' }}>
            <Icons.Phone size={18} color="var(--gold-light)" />
            <span>Позвонить</span>
          </a>
          <a href="https://wa.me/37499999999?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%83%D1%8E%20%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C." target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
            <Icons.WhatsApp size={18} color="#060913" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="hero-section" id="hero">
        <div className="container hero-grid">
          <div className="animate-fade-in">
            <div className="hero-badge">
              <Icons.Sparkles size={14} color="var(--gold-light)" />
              <span>Создано вдохновлять</span>
            </div>
            <h1 className="hero-title">
              Эксклюзивная мебель <br />
              <span>на заказ в Ереване</span>
            </h1>
            <p className="hero-subtitle">
              Премиальные мебельные решения по индивидуальным размерам. Воплощаем безупречный стиль, комфорт и высочайшее качество в каждом изделии. Гарантия 5 лет на все работы.
            </p>
            <div className="hero-actions">
              <button onClick={() => scrollToSection('estimate')} className="btn btn-primary">
                <span>Заказать расчет</span>
                <Icons.ArrowRight size={18} />
              </button>
              <a href="https://wa.me/37499999999?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%83%D1%8E%20%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C." target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Icons.WhatsApp size={18} color="var(--gold-primary)" />
                <span>Написать в WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-container">
              <img 
                src="/images/kitchen.svg" 
                alt="Эксклюзивный интерьер кухни" 
              />
            </div>
            <div className="hero-floating-card">
              <div className="hero-floating-icon">
                <Icons.Award size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '700' }}>Премиум статус</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Лидер рынка 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / ADVANTAGES SECTION */}
      <section id="about" style={{ background: '#090d1a' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">О компании</span>
            <h2 className="section-title">Почему клиенты выбирают <span>AURA</span></h2>
            <p className="section-desc">Мы не просто делаем мебель — мы создаем пространство для гармоничной жизни, используя лучшие материалы и передовые технологии.</p>
          </div>

          <div className="advantages-grid">
            <div className="adv-card">
              <div className="adv-icon-box">
                <Icons.Sparkles size={24} />
              </div>
              <h3 className="adv-title">Индивидуальность</h3>
              <p className="adv-text">Каждый проект уникален. Мы создаем мебель, которая идеально вписывается в ваш интерьер и отражает ваш характер.</p>
            </div>

            <div className="adv-card">
              <div className="adv-icon-box">
                <Icons.ShieldCheck size={24} />
              </div>
              <h3 className="adv-title">Гарантия 5 лет</h3>
              <p className="adv-text">Мы уверены в надежности своей продукции. Используем только оригинальную австрийскую фурнитуру Blum и экологичный МДФ.</p>
            </div>

            <div className="adv-card">
              <div className="adv-icon-box">
                <Icons.Clock size={24} />
              </div>
              <h3 className="adv-title">Точные сроки</h3>
              <p className="adv-text">Строго соблюдаем прописанные в договоре сроки изготовления. Средний срок реализации проекта от 20 до 35 рабочих дней.</p>
            </div>

            <div className="adv-card">
              <div className="adv-icon-box">
                <Icons.Star size={24} />
              </div>
              <h3 className="adv-title">Сервис люкс</h3>
              <p className="adv-text">Бесплатный выезд дизайнера-замерщика, полный цикл услуг от чертежа до бережной сборки и клининга после установки.</p>
            </div>
          </div>

          <div className="about-block">
            <div className="about-img-group">
              <div className="about-img-1">
                <img src="/images/wardrobe.svg" alt="Процесс замера мебели" />
              </div>
              <div className="about-img-2">
                <img src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80" alt="Сборка премиальной мебели" />
              </div>
            </div>
            <div className="about-content">
              <h3 style={{ fontSize: '32px', color: 'var(--text-primary)' }}>Искусство мебельного ремесла</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Мебельное ателье <strong>AURA</strong> родилось в Ереване с философией абсолютной бескомпромиссности. Мы объединили мастерство ручной работы с передовым немецким высокоточным оборудованием, чтобы обеспечить микронную точность в сборке.
              </p>
              <p className="about-quote">
                "Мебель — это не просто предметы быта, это архитектура внутреннего пространства вашего дома."
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-num">10+</div>
                  <div className="stat-label">Лет на рынке</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">450+</div>
                  <div className="stat-label">Проектов сдано</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">98%</div>
                  <div className="stat-label">Рекомендаций</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG / PORTFOLIO SECTION */}
      <section id="catalog">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Наши проекты</span>
            <h2 className="section-title">Каталог выполненных <span>работ</span></h2>
            <p className="section-desc">Ознакомьтесь с реальными фотографиями мебели, созданной по индивидуальным проектам для наших клиентов.</p>
          </div>

          <div className="catalog-filters">
            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Все проекты</button>
            <button className={`filter-btn ${activeFilter === 'kitchen' ? 'active' : ''}`} onClick={() => setActiveFilter('kitchen')}>Кухни</button>
            <button className={`filter-btn ${activeFilter === 'wardrobe' ? 'active' : ''}`} onClick={() => setActiveFilter('wardrobe')}>Гардеробные</button>
            <button className={`filter-btn ${activeFilter === 'livingroom' ? 'active' : ''}`} onClick={() => setActiveFilter('livingroom')}>Гостиные</button>
            <button className={`filter-btn ${activeFilter === 'other' ? 'active' : ''}`} onClick={() => setActiveFilter('other')}>Другое</button>
          </div>

          <div className="catalog-grid">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="catalog-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="catalog-img-box">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="catalog-overlay">
                    <span className="catalog-overlay-text">
                      Посмотреть детали
                      <Icons.ArrowRight size={16} />
                    </span>
                  </div>
                </div>
                <div className="catalog-info">
                  <span className="catalog-tag">{project.categoryName}</span>
                  <h3 className="catalog-item-title">{project.title}</h3>
                  <p className="catalog-item-desc">{project.desc}</p>
                  <div className="catalog-meta">
                    <span className="catalog-price">{project.price}</span>
                    <span className="catalog-more-btn">
                      Подробнее
                      <Icons.ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES & PRICING SECTION */}
      <section id="pricing" style={{ background: '#090d1a' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Цены и услуги</span>
            <h2 className="section-title">Стоимость <span>реализации</span></h2>
            <p className="section-desc">Каждый наш проект рассчитывается индивидуально, однако мы создали понятную тарифную сетку для ориентира.</p>
          </div>

          <div className="price-grid">
            <div className="price-card">
              <div className="price-header">
                <h3 className="price-title">Дизайн-Проект</h3>
                <p className="price-desc">Профессиональный дизайн вашей будущей мебели с полной технической документацией.</p>
              </div>
              <div className="price-amount-box">
                <span className="price-prefix">от</span>
                <span className="price-amount">80 000</span>
                <span className="price-unit">֏ / проект</span>
              </div>
              <ul className="price-features">
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>3D-визуализация в интерьере</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Точный выезд замерщика</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Инженерные схемы электрики/сантехники</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Подбор фактур и цветов материалов</span>
                </li>
              </ul>
              <button onClick={() => { setFormData({ ...formData, comment: 'Интересует разработка дизайн-проекта' }); scrollToSection('estimate') }} className="btn btn-outline-gold">
                Заказать проект
              </button>
            </div>

            <div className="price-card featured">
              <div className="price-header">
                <h3 className="price-title">Изготовление мебели</h3>
                <p className="price-desc">Производство мебели по готовому проекту на нашем высокотехнологичном оборудовании.</p>
              </div>
              <div className="price-amount-box">
                <span className="price-prefix">от</span>
                <span className="price-amount">450 000</span>
                <span className="price-unit">֏ / п.м.</span>
              </div>
              <ul className="price-features">
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Австрийская фурнитура Blum / Hettich</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>МДФ фасады повышенной плотности</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Влагостойкая кромка лазерной пайки</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Многоступенчатый контроль качества</span>
                </li>
              </ul>
              <button onClick={() => { setFormData({ ...formData, comment: 'Интересует изготовление мебели по индивидуальным размерам' }); scrollToSection('estimate') }} className="btn btn-primary">
                Заказать расчет
              </button>
            </div>

            <div className="price-card">
              <div className="price-header">
                <h3 className="price-title">Реализация "Под Ключ"</h3>
                <p className="price-desc">Полный цикл услуг от первоначального эскиза до окончательной сборки и клининга.</p>
              </div>
              <div className="price-amount-box">
                <span className="price-prefix">от</span>
                <span className="price-amount">650 000</span>
                <span className="price-unit">֏ / п.м.</span>
              </div>
              <ul className="price-features">
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Разработка дизайна + Производство</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Бесплатная бережная доставка</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Сборка сертифицированными мастерами</span>
                </li>
                <li className="price-feature-item">
                  <Icons.CheckCircle size={16} className="price-feature-icon" />
                  <span>Расширенная гарантия 5 лет по договору</span>
                </li>
              </ul>
              <button onClick={() => { setFormData({ ...formData, comment: 'Хочу комплексный заказ мебели под ключ' }); scrollToSection('estimate') }} className="btn btn-outline-gold">
                Заказать "Под ключ"
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ESTIMATE / ORDER FORM SECTION */}
      <section id="estimate" className="form-section">
        <div className="container">
          <div className="form-block">
            <div className="form-info">
              <div>
                <h2 className="form-info-title">Хотите рассчитать стоимость вашей будущей мебели?</h2>
                <p className="form-info-desc">
                  Заполните простую форму ниже. Наш главный технолог свяжется с вами, ответит на все вопросы и сделает предварительный расчет стоимости проекта в течение 1 часа.
                </p>
              </div>
              <div className="form-steps">
                <div className="form-step-item">
                  <div className="form-step-number">1</div>
                  <div>
                    <h4 className="form-step-title">Заявка на расчет</h4>
                    <p className="form-step-desc">Вы оставляете свои пожелания и контакты.</p>
                  </div>
                </div>
                <div className="form-step-item">
                  <div className="form-step-number">2</div>
                  <div>
                    <h4 className="form-step-title">Звонок технолога</h4>
                    <p className="form-step-desc">Обсуждаем детали проекта, материалы и фурнитуру.</p>
                  </div>
                </div>
                <div className="form-step-item">
                  <div className="form-step-number">3</div>
                  <div>
                    <h4 className="form-step-title">Готовое предложение</h4>
                    <p className="form-step-desc">Высылаем точную смету и 3D-чертеж мебели.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="estimate-form">
                <div className="form-full-width">
                  <label htmlFor="name">Ваше имя *</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Например, Саргис" 
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone">Номер телефона *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+374 (__) ___ ___" 
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email">Электронная почта (опционально)</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.ru" 
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <div className="form-full-width">
                  <label htmlFor="service">Что вас интересует?</label>
                  <select 
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="kitchen">Премиальная кухня на заказ</option>
                    <option value="wardrobe">Индивидуальная гардеробная</option>
                    <option value="livingroom">Мебель для гостиной / ТВ-консоль</option>
                    <option value="bedroom">Спальня / Мягкие стеновые панели</option>
                    <option value="office">Executive-кабинет руководителя</option>
                    <option value="bathroom">Дизайнерская мебель для ванной</option>
                  </select>
                </div>

                <div className="form-full-width">
                  <label htmlFor="comment">Комментарии или размеры (если известны)</label>
                  <textarea 
                    id="comment" 
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Примерные размеры, желаемые материалы или ваши особые пожелания..."
                  ></textarea>
                </div>

                <div className="form-full-width" style={{ marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Icons.Send size={18} color="#060913" />
                    <span>Отправить запрос на расчет</span>
                  </button>
                  <p style={{ fontSize: '11px', textAlign: 'center', color: 'var(--text-muted)', marginTop: '12px' }}>
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS SECTION */}
      <section id="contacts">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Связаться с нами</span>
            <h2 className="section-title">Контакты <span>мебельного ателье</span></h2>
            <p className="section-desc">Ждем вас в нашем шоуруме, где вы сможете лично оценить качество швов, фасадов и работу фурнитуры.</p>
          </div>

          <div className="contacts-grid">
            <div className="contacts-info-box">
              <div className="contacts-item">
                <div className="contacts-icon-box">
                  <Icons.MapPin size={24} />
                </div>
                <div>
                  <h4 className="contacts-label">Адрес шоурума</h4>
                  <p className="contacts-value">Армения, г. Ереван, проспект Саят-Нова, 26/1</p>
                </div>
              </div>

              <div className="contacts-item">
                <div className="contacts-icon-box">
                  <Icons.Phone size={24} />
                </div>
                <div>
                  <h4 className="contacts-label">Телефон и мессенджеры</h4>
                  <p className="contacts-value" style={{ marginBottom: '4px' }}>+374 99 999999</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Звонки, WhatsApp, Telegram</p>
                </div>
              </div>

              <div className="contacts-item">
                <div className="contacts-icon-box">
                  <Icons.Clock size={24} />
                </div>
                <div>
                  <h4 className="contacts-label">Режим работы</h4>
                  <p className="contacts-value" style={{ marginBottom: '4px' }}>Ежедневно с 10:00 до 20:00</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Дизайнер выезжает на замеры 24/7</p>
                </div>
              </div>

              <div>
                <h4 className="contacts-label" style={{ marginBottom: '12px' }}>Присоединяйтесь в соцсетях</h4>
                <div className="contacts-socials">
                  <a href="https://wa.me/37499999999" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="WhatsApp">
                    <Icons.WhatsApp size={20} />
                  </a>
                  <a href="https://instagram.com/aura_premium_furniture" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Instagram">
                    <Icons.Instagram size={20} />
                  </a>
                  <a href="https://t.me/aura_premium" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Telegram">
                    <Icons.Telegram size={20} />
                  </a>
                  <a href="tel:+37499999999" className="social-circle-btn" aria-label="Phone">
                    <Icons.Phone size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="map-wrapper">
              <div className="map-placeholder">
                <div className="map-vector"></div>
                <Icons.MapPin size={48} color="var(--gold-primary)" style={{ marginBottom: '16px', position: 'relative', zIndex: 2 }} />
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', zIndex: 2 }}>Интерактивная карта</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '300px', zIndex: 2, marginBottom: '20px' }}>
                  Для вашего удобства мы находимся в самом центре Еревана. Рядом есть удобная бесплатная парковка для наших гостей.
                </p>
                <a 
                  href="https://yandex.com/maps/?text=Sayat-Nova+Ave+26%2F1+Yerevan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-gold"
                  style={{ zIndex: 2 }}
                >
                  Открыть в Яндекс Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <a href="#" className="logo-container" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}) }}>
              <div className="logo-icon">A</div>
              <div>
                <span className="logo-text">AURA</span>
                <span className="logo-tagline">Premium Furniture</span>
              </div>
            </a>
            
            <ul className="footer-links">
              <li><a href="#about" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>О нас</a></li>
              <li><a href="#catalog" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('catalog') }}>Портфолио</a></li>
              <li><a href="#pricing" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('pricing') }}>Услуги</a></li>
              <li><a href="#contacts" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('contacts') }}>Контакты</a></li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} AURA Premium Custom Furniture. Все права защищены.</p>
            <p style={{ display: 'flex', gap: '20px' }}>
              <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Политика конфиденциальности</a>
              <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>Публичная оферта</a>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON WITH BADGE */}
      <a 
        href="https://wa.me/37499999999?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%83%D1%8E%20%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Contact us on WhatsApp"
      >
        <Icons.WhatsApp size={32} color="#ffffff" />
        <span className="whatsapp-float-badge">1</span>
      </a>

      {/* PORTFOLIO DETAIL DIALOG / MODAL */}
      <div className={`modal-overlay ${selectedProject ? 'open' : ''}`} onClick={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <Icons.X size={20} />
            </button>
            <div className="modal-grid">
              <div className="modal-img-box">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="modal-info-box">
                <span className="modal-tag">{selectedProject.categoryName}</span>
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-desc">{selectedProject.fullDesc}</p>
                
                <div className="modal-specs">
                  <div className="modal-spec-item">
                    <span className="modal-spec-label">Размер / Габариты:</span>
                    <span className="modal-spec-value">{selectedProject.size}</span>
                  </div>
                  <div className="modal-spec-item">
                    <span className="modal-spec-label">Срок реализации:</span>
                    <span className="modal-spec-value">{selectedProject.timeline}</span>
                  </div>
                  <div className="modal-spec-item">
                    <span className="modal-spec-label">Материалы:</span>
                    <span className="modal-spec-value" style={{ textAlign: 'right', maxWidth: '60%' }}>{selectedProject.materials}</span>
                  </div>
                  <div className="modal-spec-item">
                    <span className="modal-spec-label">Ориентировочная цена:</span>
                    <span className="modal-spec-value" style={{ color: 'var(--gold-primary)', fontWeight: '700' }}>{selectedProject.price}</span>
                  </div>
                </div>

                <div className="modal-actions" style={{ marginTop: '10px' }}>
                  <button 
                    onClick={() => { 
                      setFormData({ 
                        ...formData, 
                        comment: `Интересует расчет стоимости аналогичного проекта: "${selectedProject.title}"` 
                      }); 
                      setSelectedProject(null); 
                      scrollToSection('estimate'); 
                    }} 
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    Хочу такую же
                  </button>
                  <a 
                    href={`https://wa.me/37499999999?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%BC%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C%2C%20%D0%BC%D0%BD%D0%B5%20%D0%BF%D0%BE%D0%BD%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%81%D1%8F%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%22${encodeURIComponent(selectedProject.title)}%22.`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <Icons.WhatsApp size={18} color="var(--gold-primary)" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUCCESS TOAST POPUP */}
      <div className={`success-popup ${successToast ? 'open' : ''}`}>
        <div className="success-icon-box">
          <Icons.CheckCircle size={24} />
        </div>
        <div>
          <h4 className="success-title">Заявка принята!</h4>
          <p className="success-text">Наш технолог свяжется с вами по указанному телефону в течение 1 часа.</p>
        </div>
      </div>
    </>
  )
}

export default App
