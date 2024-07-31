import { IActivity } from '@/services/activities/types'

export const activitiesData: IActivity[] = [
  {
    id: 122,
    name: 'Saint Bartholomew the Apostle church in Stawiszyn',
    description: 'Kościół św. Bartłomieja Apostoła w Stawiszynie – rzymskokatolicki kościół parafialny znajdujący się w mieście Stawiszyn w województwie wielkopolskim, przy ulicy Szkolnej.Świątynia gotycka, ufundowana w XIV wieku przez króla Kazimierza Wielkiego. Przez pewien okres należała do Braci Czeskich. W czasie potopu szwedzkiego została zniszczona przez wojsko. W 1706 świątynia uległa spaleniu. W XVIII wieku rozpoczęto jego restaurację. Obecny kształt kościół uzyskał pod koniec XIX wieku, gdy odbudowano zakończenie wieży w stylu neogotyckim oraz sklepienie budowli. Dobudowana została kaplica i kruchta.',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stawiszyn_Church_XII.JPG/400px-Stawiszyn_Church_XII.JPG',
    ],
    destination_resource: 'open_street_map',
    migration_data: {
      xid: 'W189055542',
    },
    address: 'Kościelna 12',
    city: 'Stawiszyn',
    state: 'wielkopolskie',
    country: 'Polska',
    postal_code: '62-820',
    latitude: 51.91692352294922,
    longitude: 18.112945556640625,
    owner: null,
  },
  {
    id: 123,
    name: 'Kościół św. Andrzeja Apostoła',
    description: 'Kościół świętego Andrzeja Apostoła w Borkowie Starym – rzymskokatolicki kościół parafialny należący do parafii pod tym samym wezwaniem (dekanat Kalisz I diecezji kaliskiej).jest to świątynia wzniesiona w 1710 roku. Ufundowana została przez Bartłomieja Tarłę, biskupa poznańskiego. W 1760 roku została odnowiona i wyposażona przez proboszcza Mateusza Stawickiego. Restaurowana była w 2 połowie XIX wieku, w latach 1964–66 – została odkryta stara polichromia i poddana została konserwacji – jest to dzieło Zbigniewa Jaskowiaka, pokryte zostały również dachy blachą. Ponownie kościół był remontowany w 1993 roku.',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/SM_Stary_Bork%C3%B3w_Ko%C5%9Bci%C3%B3%C5%82_%C5%9Bw_Andrzeja_Aposto%C5%82a_2017_%2811%29_full.jpg/400px-SM_Stary_Bork%C3%B3w_Ko%C5%9Bci%C3%B3%',
    ],
    destination_resource: 'open_street_map',
    migration_data: {
      xid: 'W231121981',
    },
    address: 'None None',
    city: null,
    state: 'wielkopolskie',
    country: 'Polska',
    postal_code: '62-817',
    latitude: 51.82615280151367,
    longitude: 18.124406814575195,
    owner: null,
  },
]
