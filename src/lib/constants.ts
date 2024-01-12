import 'dotenv'

export const PROVIDER_MONGODB_DB = process.env.GOOGLE_MONGODB_DB as string
export const DEFAULT_MONGODB_DB = process.env.DEFAULT_MONGODB_DB as string
export const MONGODB_URI = process.env.MONGODB_URI as string
export const HOST = process.env.HOST as string
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string

export const EMAIL_PATTERN = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PASSWORD_PATTERN = /^(?=.*[!-~])(?=.{8,64})/

export const INGREDIENTS: {
  vegetables: string[],
  fruits: string[],
  meats: {
    beef: string[],
    chicken: string[],
    pork: string[],
    fish: string[],
    [key: string]: any
  }
  [key: string]: any
} = {
  vegetables: [
    'Acelga', 'Achicoria', 'Ajo', 'Alcachofa', 'Alga', 'Apio', 'Arúgula', 'Batata', 'Berenjena', 'Berro', 'Berza', 'Betabel', 'Betarraga', 'Brócoli', 'Calabacín', 'Calabaza', 'Camote', 'Cardo', 'Cebolla', 'Cebollino', 'Champiñones', 'Chayote', 'Ají', 'Chirivía', 'Cilantro', 'Col', 'Brusela', 'Coliflor', 'Colirrábano', 'Daikon', 'Endivia', 'Eneldo', 'Escarola', 'Espárrago', 'Espinaca', 'Frijol', 'Frisée', 'Guisante', 'Haba', 'Hinojo', 'Portobello', 'Jengibre', 'Jícama', 'Judía', 'Kale', 'Kohlrabi', 'Lechuga', 'Maíz', 'Nabo', 'Okra', 'Pak choi', 'Papa', 'Pepino', 'Perejil', 'Morrón', 'Puerro', 'Rábano', 'Radicheta', 'Remolacha', 'Rúcula', 'Ruibarbo', 'Salsifí', 'Tomate', 'Cherry', 'Zanahoria', 'Zapallo'
  ],
  fruits: [
    'Manzanas', 'Plátanos', 'Naranjas', 'Mandarinas', 'Fresas', 'Uvas', 'Limones', 'Melocotones', 'Peras', 'Kiwis', 'Piñas', 'Sandías', 'Melones', 'Papayas', 'Aguacates', 'Granadas', 'Moras', 'Arándanos', 'Frambuesas', 'Guayabas', 'Higos', 'Grosellas', 'Ciruelas', 'Pimientos', 'Litchis', 'Pomelos', 'Carambolas', 'Nísperos', 'Maracuyá', 'Tamarindos', 'Pitayas', 'Caquis', 'Cerezas', 'Mangos', 'Ciruela', 'Bananas', 'Cocos', 'Damascos', 'Duraznos', 'Granadillas', 'Paltas', 'Quinotos'
  ],
  meats: {
    beef: [
      'Asado', 'Tira de Asado', 'Bife de costilla', 'Bife de Chorizo', 'Bola de lomo', 'Chinchulín', 'Colita de cuadril', 'Cuadril', 'Entraña', 'Falda', 'Lomo', 'Matambre', 'Mollejas', 'Pecho', 'Riñones', 'Tapa de asado', 'Tapa de nalga', 'Vacío'
    ],
    chicken: [
      'Pechuga', 'Ala', 'Pata', 'Muslo'
    ],
    pork: [
      'Solomillo', 'Jamón', 'Paleta', 'Lomo', 'Costillas', 'Panceta', 'Bondiola'
    ],
    fish: [
      'Merluza', 'Corvina', 'Pejerrey', 'Chinchard', 'Lenguado', 'Anchoa', 'Boga', 'Bagre', 'Dorado', 'Pez Limón', 'Rayas', 'Abadejo', 'Anguila', 'Atún', 'Bacalao', 'Besugo', 'Bonito', 'Boquerón', 'Cabracho', 'Calamar', 'Camarón', 'Cangrejo', 'Carpa', 'Dorada', 'Gallo', 'Gambas', 'Jurel', 'Langosta', 'Langostino', 'Lubina', 'Mejillones', 'Mero', 'Palometa', 'Pargo', 'Pez espada', 'Pintarroja', 'Pulpo', 'Rodaballo', 'Salmón', 'Sardina', 'Sepia', 'Trucha', 'Vieira', 'Cazon', 'Pollo de Mar', 'Trillas', 'Truchon', 'Cornalito', 'Almejas', 'Berberecho', 'Pacu'
    ],
  }
}

export const FLATTENED_INGREDIENTS: string[] = [
  'Acelga', 'Achicoria', 'Ajo', 'Alcachofa', 'Alga', 'Apio', 'Arúgula', 'Batata', 'Berenjena', 'Berro', 'Berza', 'Betabel', 'Betarraga', 'Brócoli', 'Calabacín', 'Calabaza', 'Camote', 'Cardo', 'Cebolla', 'Cebollino', 'Champiñones', 'Chayote', 'Ají', 'Chirivía', 'Cilantro', 'Col', 'Brusela', 'Coliflor', 'Colirrábano', 'Daikon', 'Endivia', 'Eneldo', 'Escarola', 'Espárrago', 'Espinaca', 'Frijol', 'Frisée', 'Guisante', 'Haba', 'Hinojo', 'Portobello', 'Jengibre', 'Jícama', 'Judía', 'Kale', 'Kohlrabi', 'Lechuga', 'Maíz', 'Nabo', 'Okra', 'Pak choi', 'Papa', 'Pepino', 'Perejil', 'Morrón', 'Puerro', 'Rábano', 'Radicheta', 'Remolacha', 'Rúcula', 'Ruibarbo', 'Salsifí', 'Tomate', 'Cherry', 'Zanahoria', 'Zapallo', 'Manzanas', 'Plátanos', 'Naranjas', 'Mandarinas', 'Fresas', 'Uvas', 'Limones', 'Melocotones', 'Peras', 'Kiwis', 'Piñas', 'Sandías', 'Melones', 'Papayas', 'Aguacates', 'Granadas', 'Moras', 'Arándanos', 'Frambuesas', 'Guayabas', 'Higos', 'Grosellas', 'Ciruelas', 'Pimientos', 'Litchis', 'Pomelos', 'Carambolas', 'Nísperos', 'Maracuyá', 'Tamarindos', 'Pitayas', 'Caquis', 'Cerezas', 'Mangos', 'Ciruela', 'Bananas', 'Cocos', 'Damascos', 'Duraznos', 'Granadillas', 'Paltas', 'Quinotos', 'Asado', 'Tira de Asado', 'Bife de costilla', 'Bife de Chorizo', 'Bola de lomo', 'Chinchulín', 'Colita de cuadril', 'Cuadril', 'Entraña', 'Falda', 'Lomo', 'Matambre', 'Mollejas', 'Pecho', 'Riñones', 'Tapa de asado', 'Tapa de nalga', 'Vacío', 'Pechuga', 'Ala', 'Pata', 'Muslo', 'Solomillo', 'Jamón', 'Paleta', 'Lomo', 'Costillas', 'Panceta', 'Bondiola', 'Merluza', 'Corvina', 'Pejerrey', 'Chinchard', 'Lenguado', 'Anchoa', 'Boga', 'Bagre', 'Dorado', 'Pez Limón', 'Rayas', 'Abadejo', 'Anguila', 'Atún', 'Bacalao', 'Besugo', 'Bonito', 'Boquerón', 'Cabracho', 'Calamar', 'Camarón', 'Cangrejo', 'Carpa', 'Dorada', 'Gallo', 'Gambas', 'Jurel', 'Langosta', 'Langostino', 'Lubina', 'Mejillones', 'Mero', 'Palometa', 'Pargo', 'Pez espada', 'Pintarroja', 'Pulpo', 'Rodaballo', 'Salmón', 'Sardina', 'Sepia', 'Trucha', 'Vieira', 'Cazon', 'Pollo de Mar', 'Trillas', 'Truchon', 'Cornalito', 'Almejas', 'Berberecho', 'Pacu'
]

export const css = {
  transparent: {
    background: 'rgba( 255, 255, 255, 0.15 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 11.5px )',
    WebkitBackdropFilter: 'blur( 11.5px )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )'
  },
  blackTransparent: {
    background: 'background: linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%);',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 11.5px )',
    WebkitBackdropFilter: 'blur( 11.5px )',
    borderRadius: '10px',
    border: '1px solid rgba( 255, 255, 255, 0.18 )'
  }
}
