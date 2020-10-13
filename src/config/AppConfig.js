export const BASE_API_URL = process.env.BASE_API_URL
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
export const API_PDF_GEN_URL = process.env.API_PDF_GEN_URL
export const API_EXCEL_GEN_URL = process.env.API_EXCEL_GEN_URL

export const DISTRICTS = [
  { id: 0, label: 'Abramowice' },
  { id: 1, label: 'Bronowice' },
  { id: 2, label: 'Czechów Południowy' },
  { id: 3, label: 'Czechów Północny' },
  { id: 4, label: 'Czuby Południowe' },
  { id: 5, label: 'Czuby Północne' },
  { id: 6, label: 'Dziesiąta' },
  { id: 7, label: 'Felin' },
  { id: 8, label: 'Głusk' },
  { id: 9, label: 'Hajdów-Zadębie' },
  { id: 10, label: 'Kalinowszczyzna' },
  { id: 11, label: 'Konstantynów' },
  { id: 12, label: 'Kośminek' },
  { id: 13, label: 'Ponikwoda' },
  { id: 14, label: 'Rury' },
  { id: 15, label: 'Sławin' },
  { id: 16, label: 'Sławinek' },
  { id: 17, label: 'Stare Miasto' },
  { id: 18, label: 'Szerokie' },
  { id: 19, label: 'Śródmieście' },
  { id: 20, label: 'Tatary' },
  { id: 21, label: 'Węglin Południowy' },
  { id: 22, label: 'Węglin Północny' },
  { id: 23, label: 'Wieniawa' },
  { id: 24, label: 'Wrotków' },
  { id: 25, label: 'Za Cukrownią' },
  { id: 26, label: 'Zemborzyce' }
]

export const YEARS = [
  { id: 1960, label: 1960 },
  { id: 1961, label: 1961 },
  { id: 1962, label: 1962 },
  { id: 1963, label: 1963 },
  { id: 1964, label: 1964 },
  { id: 1965, label: 1965 },
  { id: 1966, label: 1966 },
  { id: 1967, label: 1967 },
  { id: 1968, label: 1968 },
  { id: 1969, label: 1969 },
  { id: 1970, label: 1970 },
  { id: 1971, label: 1971 },
  { id: 1972, label: 1972 },
  { id: 1973, label: 1973 },
  { id: 1974, label: 1974 },
  { id: 1975, label: 1975 },
  { id: 1976, label: 1976 },
  { id: 1977, label: 1977 },
  { id: 1978, label: 1978 },
  { id: 1979, label: 1979 },
  { id: 1980, label: 1980 },
  { id: 1981, label: 1981 },
  { id: 1982, label: 1982 },
  { id: 1983, label: 1983 },
  { id: 1984, label: 1984 },
  { id: 1985, label: 1985 },
  { id: 1986, label: 1986 },
  { id: 1987, label: 1987 },
  { id: 1988, label: 1988 },
  { id: 1989, label: 1989 },
  { id: 1990, label: 1990 },
  { id: 1991, label: 1991 },
  { id: 1992, label: 1992 },
  { id: 1993, label: 1993 },
  { id: 1994, label: 1994 },
  { id: 1995, label: 1995 },
  { id: 1996, label: 1996 },
  { id: 1997, label: 1997 },
  { id: 1998, label: 1998 },
  { id: 1999, label: 1999 },
  { id: 2000, label: 2000 },
  { id: 2001, label: 2001 },
  { id: 2002, label: 2002 },
  { id: 2003, label: 2003 },
  { id: 2004, label: 2004 },
  { id: 2005, label: 2005 },
  { id: 2006, label: 2006 },
  { id: 2007, label: 2007 },
  { id: 2008, label: 2008 },
  { id: 2009, label: 2009 },
  { id: 2010, label: 2010 },
  { id: 2011, label: 2011 },
  { id: 2012, label: 2012 },
  { id: 2013, label: 2013 },
  { id: 2014, label: 2014 },
  { id: 2015, label: 2015 }
]

export const PERMISSIONS = [
  // Send self-invitation for school/club
  // { id: 1, label: 'Składa zaproszenie do klubu/szkoły' },
  // { id: 2, label: 'Dodaje/aktualizuje kalendarz wydarzeń lub imprez' },

  // CRUD lessons, participants & p.lists - done
  { id: 3, label: 'Dodaje/aktualizuje dziennik uczestników' },
  { id: 4, label: 'Dodaje/aktualizuje frekwencję (listę obecności)' },
  // todo
  { id: 5, label: 'Generuje raporty' },
  // { id: 6, label: 'Ustanawia/modyfikuje zastępstwo/odwołuje zajęcia (zmiany dotyczą również obiektu, terminu zajęć)' },
  // { id: 7, label: 'Usuwa pojedyncze i seryjnie zajęcia' },
  // todo
  { id: 8, label: 'Wprowadza wyniki MTSF-u' },
  { id: 9, label: 'Archiwizuje listy zawodników z możliwością przeniesienia i edycji listy na kolejny rok/sezon' }
]

export const LESSON_REPEAT = [
  { id: 1, label: '1 tydz.' },
  { id: 2, label: '2 tyg.' },
  { id: 3, label: '3 tyg.' },
  { id: 4, label: '4 tyg.' },
  { id: 5, label: '5 tyg.' },
  { id: 6, label: '6 tyg.' },
  { id: 7, label: '7 tyg.' },
  { id: 8, label: '8 tyg.' },
  { id: 9, label: '9 tyg.' },
  { id: 10, label: '10 tyg.' },
  { id: 11, label: '11 tyg.' },
  { id: 12, label: '12 tyg.' },
  { id: 13, label: '13 tyg.' },
  { id: 14, label: '14 tyg.' },
  { id: 15, label: '15 tyg.' },
  { id: 16, label: '16 tyg.' },
  { id: 17, label: '17 tyg.' },
  { id: 18, label: '18 tyg.' },
  { id: 19, label: '19 tyg.' },
  { id: 20, label: '20 tyg.' },
  { id: 21, label: '21 tyg.' },
  { id: 22, label: '22 tyg.' },
  { id: 23, label: '23 tyg.' },
  { id: 24, label: '24 tyg.' },
  { id: 25, label: '25 tyg.' }
]

export const DATEPICKER_PARAMS = {
  lang: {
    days: ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
    placeholder: {
      date: 'Wybierz datę',
      dateRange: 'Select Date Range'
    }
  },
  hours: Array.from({ length: 10 }).map((_, i) => i + 8)
}

export const CALENDAR_PARAMS = {
  months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
  weekdays: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'N'],
}
