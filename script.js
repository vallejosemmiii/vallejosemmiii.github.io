document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        es: {
            title: "WoW Crafting & Economy Hub",
            btn: "Calcular Ganancias en Vivo",
            selectRealm: "Selecciona tu servidor...",
            defaultText: "Selecciona un servidor y una receta para consultar la Casa de Subastas...",
            lblRealm: "Servidor de Juego:",
            lblCraftQty: "Cantidad a Craftear:",
            lblSearch: "Buscar Receta o Ítem:",
            lblRecipeSelect: "Seleccionar Receta Específica:",
            optDefaultRecipe: "Selecciona una receta del catálogo...",
            searchPlaceholder: "Ej. Frasco, Gema, Bismuto...",
            profAll: "Todas", profFav: "⭐ Favoritas", profAlchemy: "Alquimia", profJC: "Joyería",
            profBS: "Herrería", profEnc: "Encantamiento", profLW: "Peletería", profTail: "Sastrería", profEng: "Ingeniería",
            tableMaterial: "Material / Componente", tableQty: "Necesario", tableOwned: "Tienes", tablePrice: "Precio Unit. (AH)", tableSubtotal: "Subtotal",
            costMaterials: "Costo de Materiales", netSale: "Venta Neta (-5%)", netProfit: "Ganancia Neta", salePriceLabel: "Precio de Venta (AH):",
            syncing: "Sincronizando precios en tiempo real con la Casa de Subastas de Blizzard...",
            selectRealmAlert: "Por favor, selecciona un servidor primero.", selectRecipeAlert: "Por favor, selecciona una receta del catálogo.",
            copiedText: "¡Lista de compras copiada al portapapeles!",
            addedSession: "¡Añadido a la sesión de crafteo!"
        },
        en: {
            title: "WoW Crafting & Economy Hub",
            btn: "Calculate Live Profits",
            selectRealm: "Select your realm...",
            defaultText: "Select a realm and recipe to query the Auction House...",
            lblRealm: "Game Realm:", lblCraftQty: "Craft Quantity:", lblSearch: "Search Recipe or Item:",
            lblRecipeSelect: "Select Specific Recipe:", optDefaultRecipe: "Select a recipe from the catalog...", searchPlaceholder: "Ex. Flask, Gem...",
            profAll: "All", profFav: "⭐ Favorites", profAlchemy: "Alchemy", profJC: "Jewelcrafting",
            profBS: "Blacksmithing", profEnc: "Enchanting", profLW: "Leatherworking", profTail: "Tailoring", profEng: "Engineering",
            tableMaterial: "Material / Component", tableQty: "Required", tableOwned: "Owned", tablePrice: "Unit Price (AH)", tableSubtotal: "Subtotal",
            costMaterials: "Materials Cost", netSale: "Net Sale (-5%)", netProfit: "Net Profit", salePriceLabel: "Sale Price (AH):",
            syncing: "Synchronizing real-time prices with Blizzard Auction House...",
            selectRealmAlert: "Please select a realm first.", selectRecipeAlert: "Please select a recipe from the catalog.",
            copiedText: "Shopping list copied to clipboard!", addedSession: "Added to crafting session!"
        }
    };

    // CATÁLOGO MASIVO COMPLETO RESTAURADO AL 100%
    const recipesDatabase = {
        // --- ALQUIMIA (10 recetas) ---
        "flask_alacrity": {
            prof: "alchemy", salePrice: 450,
            names: { es: "Frasco de Pungente Alacridad", en: "Flask of Pungent Alacrity" },
            materials: [
                { id: 210815, names: { es: "Flor de la peste", en: "Blighted Herb" }, source: { es: "🌱 Herboristería: Isla Dorn", en: "🌱 Herbalism" }, qty: 5 },
                { id: 210802, names: { es: "Lirio pacífico", en: "Peacebloom" }, source: { es: "🌱 Herboristería general", en: "🌱 Herbalism" }, qty: 3 },
                { id: 210798, names: { es: "Hoja de Ensueño", en: "Dreamleaf" }, source: { es: "🌱 Herboristería: Val'sharah", en: "🌱 Herbalism" }, qty: 2 }
            ]
        },
        "flask_tempered": {
            prof: "alchemy", salePrice: 520,
            names: { es: "Frasco de Furia Templada", en: "Flask of Tempered Fury" },
            materials: [
                { id: 210815, names: { es: "Flor de la peste", en: "Blighted Herb" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 6 },
                { id: 211503, names: { es: "Frasco coalescente", en: "Coalesced Vial" }, source: { es: "🧪 Proveedor de Alquimia", en: "🧪 Alchemy Vendor" }, qty: 2 }
            ]
        },
        "potion_cauldron": {
            prof: "alchemy", salePrice: 3200,
            names: { es: "Caldero de Alquimia de Batalla", en: "Battle Alchemist's Cauldron" },
            materials: [
                { id: 210815, names: { es: "Flor de la peste", en: "Blighted Herb" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 20 },
                { id: 210802, names: { es: "Lirio pacífico", en: "Peacebloom" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 15 },
                { id: 211503, names: { es: "Frasco coalescente", en: "Coalesced Vial" }, source: { es: "🧪 Proveedor", en: "🧪 Vendor" }, qty: 5 }
            ]
        },
        "potion_tauri": {
            prof: "alchemy", salePrice: 210,
            names: { es: "Poción de Velocidad Ciclópea", en: "Cyclopean Speed Potion" },
            materials: [
                { id: 210802, names: { es: "Lirio pacífico", en: "Peacebloom" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 4 },
                { id: 210798, names: { es: "Hoja de Ensueño", en: "Dreamleaf" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 2 }
            ]
        },
        "potion_ultimate": {
            prof: "alchemy", salePrice: 650,
            names: { es: "Poción de Poder Definitivo", en: "Ultimate Power Potion" },
            materials: [
                { id: 210815, names: { es: "Flor de la peste", en: "Blighted Herb" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 8 },
                { id: 211503, names: { es: "Frasco coalescente", en: "Coalesced Vial" }, source: { es: "🧪 Proveedor", en: "🧪 Vendor" }, qty: 3 }
            ]
        },
        "flask_avas": {
            prof: "alchemy", salePrice: 780,
            names: { es: "Frasco de Sabiduría Sinuosa", en: "Flask of Tempered Wits" },
            materials: [
                { id: 210815, names: { es: "Flor de la peste", en: "Blighted Herb" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 6 },
                { id: 210798, names: { es: "Hoja de Ensueño", en: "Dreamleaf" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 3 }
            ]
        },
        "potion_healing_tww": {
            prof: "alchemy", salePrice: 150,
            names: { es: "Poción de Sanación Algari", en: "Algari Healing Potion" },
            materials: [
                { id: 210802, names: { es: "Lirio pacífico", en: "Peacebloom" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 3 },
                { id: 211503, names: { es: "Frasco coalescente", en: "Coalesced Vial" }, source: { es: "🧪 Proveedor", en: "🧪 Vendor" }, qty: 1 }
            ]
        },
        "elixir_accuracy": {
            prof: "alchemy", salePrice: 380,
            names: { es: "Elixir de Precisión Letal", en: "Elixir of Deadly Precision" },
            materials: [
                { id: 210815, names: { es: "Flor de la peste", en: "Blighted Herb" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 4 },
                { id: 210798, names: { es: "Hoja de Ensueño", en: "Dreamleaf" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 2 }
            ]
        },
        "transmute_ore": {
            prof: "alchemy", salePrice: 950,
            names: { es: "Transmutación: Araconita", en: "Transmute: Araconite" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 10 },
                { id: 211503, names: { es: "Frasco coalescente", en: "Coalesced Vial" }, source: { es: "🧪 Proveedor", en: "🧪 Vendor" }, qty: 2 }
            ]
        },
        "oil_awakened": {
            prof: "alchemy", salePrice: 420,
            names: { es: "Aceite de Dormir Despierto", en: "Awakened Sleeping Oil" },
            materials: [
                { id: 210815, names: { es: "Flor de la peste", en: "Blighted Herb" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 5 },
                { id: 210802, names: { es: "Lirio pacífico", en: "Peacebloom" }, source: { es: "🌱 Herboristería", en: "🌱 Herbalism" }, qty: 2 }
            ]
        },

        // --- JOYERÍA (10 recetas) ---
        "gem_culminating": {
            prof: "jewelcrafting", salePrice: 600,
            names: { es: "Rubí Culpable Deslumbrante", en: "Culminating Blasphemite" },
            materials: [
                { id: 213744, names: { es: "Artesa (Bismuto)", en: "Bismuth" }, source: { es: "⛏️ Minería: The Ringing Deeps", en: "⛏️ Mining" }, qty: 10 },
                { id: 213750, names: { es: "Barra de veraplata", en: "Truesilver Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 2 },
                { id: 213755, names: { es: "Diamante de asedio", en: "Onyx" }, source: { es: "👾 Drop: Elementales", en: "👾 Drop" }, qty: 1 }
            ]
        },
        "neck_azure": {
            prof: "jewelcrafting", salePrice: 1500,
            names: { es: "Collar de Veraplata Encantado", en: "Gilded Truesilver Necklace" },
            materials: [
                { id: 213750, names: { es: "Barra de veraplata", en: "Truesilver Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 6 },
                { id: 213760, names: { es: "Esmeralda viviente", en: "Culminating Gem" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 2 }
            ]
        },
        "gem_quick": {
            prof: "jewelcrafting", salePrice: 480,
            names: { es: "Ónix Sibilante Rápido", en: "Quick Sibilant Onyx" },
            materials: [
                { id: 213744, names: { es: "Artesa (Bismuto)", en: "Bismuth" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 8 },
                { id: 213760, names: { es: "Esmeralda viviente", en: "Culminating Gem" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 1 }
            ]
        },
        "ring_master": {
            prof: "jewelcrafting", salePrice: 2200,
            names: { es: "Sello de Maestría Estelar", en: "Stellar Mastery Signet" },
            materials: [
                { id: 213750, names: { es: "Barra de veraplata", en: "Truesilver Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 8 },
                { id: 213755, names: { es: "Diamante de asedio", en: "Onyx" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 2 }
            ]
        },
        "gem_crowned": {
            prof: "jewelcrafting", salePrice: 890,
            names: { es: "Zafiro Real Resplandeciente", en: "Radiant Crown Sapphire" },
            materials: [
                { id: 213744, names: { es: "Artesa (Bismuto)", en: "Bismuth" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 12 },
                { id: 213760, names: { es: "Esmeralda viviente", en: "Culminating Gem" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 3 }
            ]
        },
        "loop_obsidian": {
            prof: "jewelcrafting", salePrice: 1100,
            names: { es: "Lazo de Obsidiana Tallada", en: "Carved Obsidian Loop" },
            materials: [
                { id: 213744, names: { es: "Artesa (Bismuto)", en: "Bismuth" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 10 },
                { id: 213750, names: { es: "Barra de veraplata", en: "Truesilver Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 4 }
            ]
        },
        "choker_amber": {
            prof: "jewelcrafting", salePrice: 1650,
            names: { es: "Gargantilla de Ámbar Resplandeciente", en: "Gleaming Amber Choker" },
            materials: [
                { id: 213750, names: { es: "Barra de veraplata", en: "Truesilver Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 7 },
                { id: 213755, names: { es: "Diamante de asedio", en: "Onyx" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 2 }
            ]
        },
        "gem_faceted_ruby": {
            prof: "jewelcrafting", salePrice: 540,
            names: { es: "Rubí Tallado Certero", en: "Faceted Accurate Ruby" },
            materials: [
                { id: 213744, names: { es: "Artesa (Bismuto)", en: "Bismuth" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 9 }
            ]
        },
        "monocle_jewel": {
            prof: "jewelcrafting", salePrice: 2800,
            names: { es: "Monóculo de Orfebre Magistral", en: "Masterful Jewelcrafter's Monocle" },
            materials: [
                { id: 213750, names: { es: "Barra de veraplata", en: "Truesilver Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 10 },
                { id: 213755, names: { es: "Diamante de asedio", en: "Onyx" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 3 }
            ]
        },
        "idol_stone": {
            prof: "jewelcrafting", salePrice: 720,
            names: { es: "Ídolo de Jaspe Tallado", en: "Carved Jasper Idol" },
            materials: [
                { id: 213744, names: { es: "Artesa (Bismuto)", en: "Bismuth" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 11 }
            ]
        },

        // --- HERRERÍA (10 recetas) ---
        "alloy_Bismuth": {
            prof: "blacksmithing", salePrice: 120,
            names: { es: "Lingote de Bismuto Enriquecido", en: "Bismuth Alloy" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería: Khaz Algar", en: "⛏️ Mining" }, qty: 10 },
                { id: 211105, names: { es: "Mena fundida", en: "Molten Slag" }, source: { es: "👾 Drop: Mobs mecánicos", en: "👾 Drop" }, qty: 2 }
            ]
        },
        "sword_epic": {
            prof: "blacksmithing", salePrice: 2800,
            names: { es: "Gran Espada de Saronita Pura", en: "Bismuth Greatsword" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 15 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 4 },
                { id: 211250, names: { es: "Hueso primordial", en: "Primordial Bone" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 2 }
            ]
        },
        "shield_heavy": {
            prof: "blacksmithing", salePrice: 1950,
            names: { es: "Pavés de Acero Real", en: "Royal Steel Pavise" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 12 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 3 }
            ]
        },
        "cuirass_plate": {
            prof: "blacksmithing", salePrice: 3500,
            names: { es: "Coraza de Batalla Inquebrantable", en: "Unbreakable Battle Cuirass" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 20 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 6 }
            ]
        },
        "axe_titanium": {
            prof: "blacksmithing", salePrice: 3100,
            names: { es: "Hacha de Guerra de Khaz Algar", en: "Khaz Algar War Axe" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 18 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 5 }
            ]
        },
        "helmet_plate": {
            prof: "blacksmithing", salePrice: 2950,
            names: { es: "Yelmo de Guardián de Magma", en: "Magma Guard Greathelm" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 14 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 4 }
            ]
        },
        "greaves_sturdy": {
            prof: "blacksmithing", salePrice: 2400,
            names: { es: "Espinilleras de Acero Forjado", en: "Forged Steel Greaves" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 12 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 3 }
            ]
        },
        "mace_spiked": {
            prof: "blacksmithing", salePrice: 2650,
            names: { es: "Maza Pesada de Asedio", en: "Heavy Siege Mace" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 14 },
                { id: 211250, names: { es: "Hueso primordial", en: "Primordial Bone" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 3 }
            ]
        },
        "bracers_plate": {
            prof: "blacksmithing", salePrice: 1750,
            names: { es: "Brazales de Guardia Férrea", en: "Iron Guard Vambraces" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 10 }
            ]
        },
        "belt_girdle": {
            prof: "blacksmithing", salePrice: 1900,
            names: { es: "Fajín de Placas Reforzadas", en: "Reinforced Plate Girdle" },
            materials: [
                { id: 211100, names: { es: "Mineral de Bismuto", en: "Bismuth Ore" }, source: { es: "⛏️ Minería", en: "⛏️ Mining" }, qty: 11 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 2 }
            ]
        },

        // --- ENCANTAMIENTO (10 recetas) ---
        "enchant_weapon": {
            prof: "enchanting", salePrice: 1850,
            names: { es: "Encantamiento de Arma: Divisa Flamígera", en: "Enchant Weapon - Authority" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar verde", en: "✨ Disenchanting" }, qty: 8 },
                { id: 224005, names: { es: "Esencia cósmica mayor", en: "Shimmering Crystal" }, source: { es: "✨ Desencantar azul", en: "✨ Disenchanting" }, qty: 4 },
                { id: 224010, names: { es: "Cristal de vacío", en: "Eternium Dust" }, source: { es: "✨ Desencantar épico", en: "✨ Disenchanting" }, qty: 1 }
            ]
        },
        "enchant_ring": {
            prof: "enchanting", salePrice: 950,
            names: { es: "Encantamiento de Anillo: Velocidad Radiante", en: "Enchant Ring - Radiant Speed" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 5 },
                { id: 224005, names: { es: "Esencia cósmica mayor", en: "Shimmering Crystal" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 2 }
            ]
        },
        "enchant_cloak": {
            prof: "enchanting", salePrice: 720,
            names: { es: "Encantamiento de Capa: Gracia Alada", en: "Enchant Cloak - Winged Grace" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 4 },
                { id: 224010, names: { es: "Cristal de vacío", en: "Eternium Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 1 }
            ]
        },
        "enchant_chest": {
            prof: "enchanting", salePrice: 2400,
            names: { es: "Encantamiento de Pecho: Estadísticas Gloriosas", en: "Enchant Chest - Glorious Stats" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 12 },
                { id: 224010, names: { es: "Cristal de vacío", en: "Eternium Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 2 }
            ]
        },
        "enchant_boots": {
            prof: "enchanting", salePrice: 820,
            names: { es: "Encantamiento de Botas: Paso Ciclónico", en: "Enchant Boots - Cyclonic Step" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 6 },
                { id: 224005, names: { es: "Esencia cósmica mayor", en: "Shimmering Crystal" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 2 }
            ]
        },
        "enchant_bracer": {
            prof: "enchanting", salePrice: 1150,
            names: { es: "Encantamiento de Brazales: Precisión de Maestro", en: "Enchant Bracer - Master's Precision" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 7 },
                { id: 224005, names: { es: "Esencia cósmica mayor", en: "Shimmering Crystal" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 3 }
            ]
        },
        "enchant_weapon_major": {
            prof: "enchanting", salePrice: 3100,
            names: { es: "Encantamiento de Arma: Fulgor Arcano", en: "Enchant Weapon - Arcane Flare" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 15 },
                { id: 224010, names: { es: "Cristal de vacío", en: "Eternium Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 3 }
            ]
        },
        "oil_wizard": {
            prof: "enchanting", salePrice: 590,
            names: { es: "Aceite de Maná Arcano", en: "Arcane Mana Oil" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 6 }
            ]
        },
        "stone_sharpen": {
            prof: "enchanting", salePrice: 450,
            names: { es: "Piedra de Afilar Resonante", en: "Resonant Sharpening Stone" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 5 }
            ]
        },
        "enchant_shield_block": {
            prof: "enchanting", salePrice: 910,
            names: { es: "Encantamiento de Escudo: Baluarte Inquebrantable", en: "Enchant Shield - Steadfast Bulwark" },
            materials: [
                { id: 224001, names: { es: "Polvo abisal", en: "Storm Dust" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 7 },
                { id: 224005, names: { es: "Esencia cósmica mayor", en: "Shimmering Crystal" }, source: { es: "✨ Desencantar", en: "✨ Disenchanting" }, qty: 2 }
            ]
        },

        // --- PELETERÍA (10 recetas) ---
        "armor_kit": {
            prof: "leatherworking", salePrice: 340,
            names: { es: "Kit de Armadura Reforzado", en: "Reinforced Armor Kit" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello: Bestias", en: "🔪 Skinning" }, qty: 8 },
                { id: 218005, names: { es: "Escama endurecida", en: "Scale" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 3 }
            ]
        },
        "boots_leather": {
            prof: "leatherworking", salePrice: 1600,
            names: { es: "Botas de Merodeador Sombrío", en: "Shadow Prowler Boots" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 12 },
                { id: 218005, names: { es: "Escama endurecida", en: "Scale" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 4 }
            ]
        },
        "legs_scaled": {
            prof: "leatherworking", salePrice: 2900,
            names: { es: "Pantalones de Escama Feroz", en: "Fierce Scaled Leggings" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 16 },
                { id: 218005, names: { es: "Escama endurecida", en: "Scale" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 6 }
            ]
        },
        "tunic_storm": {
            prof: "leatherworking", salePrice: 3400,
            names: { es: "Túnica de Cuero de Tormenta", en: "Stormhide Tunic" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 20 },
                { id: 218005, names: { es: "Escama endurecida", en: "Scale" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 7 }
            ]
        },
        "helm_leather": {
            prof: "leatherworking", salePrice: 2700,
            names: { es: "Yelmo de Cuero Acechante", en: "Stalker's Leather Mask" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 14 },
                { id: 218005, names: { es: "Escama endurecida", en: "Scale" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 5 }
            ]
        },
        "shoulders_hide": {
            prof: "leatherworking", salePrice: 2100,
            names: { es: "Obreras de Piel Gruesa", en: "Thick-Hide Spaulders" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 12 },
                { id: 218005, names: { es: "Escama endurecida", en: "Scale" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 4 }
            ]
        },
        "gloves_prowler": {
            prof: "leatherworking", salePrice: 1550,
            names: { es: "Guantes de Acechador Rápido", en: "Swift Prowler Gloves" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 10 },
                { id: 218005, names: { es: "Escama endurecida", en: "Scale" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 3 }
            ]
        },
        "belt_leather": {
            prof: "leatherworking", salePrice: 1450,
            names: { es: "Cinturón de Caza Sombrío", en: "Shadow Hunt Belt" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 9 },
                { id: 218005, names: { es: "Escama endurecida", en: "Scale" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 3 }
            ]
        },
        "drum_battle": {
            prof: "leatherworking", salePrice: 850,
            names: { es: "Tambores de Furia Temprana", en: "Furious Battle Drums" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 15 }
            ]
        },
        "cloak_leather": {
            prof: "leatherworking", salePrice: 1300,
            names: { es: "Capa de Viaje de Piel", en: "Hide Travel Cloak" },
            materials: [
                { id: 218001, names: { es: "Cuero basto", en: "Leather" }, source: { es: "🔪 Desuello", en: "🔪 Skinning" }, qty: 10 }
            ]
        },

        // --- SASTRERÍA (10 recetas) ---
        "cloth_bolt": {
            prof: "tailoring", salePrice: 180,
            names: { es: "Rollo de Tela Crepuscular", en: "Bolt of Weavecloth" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop: Humanoides", en: "👾 Drop" }, qty: 10 }
            ]
        },
        "robe_spellfire": {
            prof: "tailoring", salePrice: 2400,
            names: { es: "Vestimentas de Tejefuego", en: "Spellfire Robes" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 16 },
                { id: 219005, names: { es: "Seda tejida de éter", en: "Ether Silk" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 4 }
            ]
        },
        "mantle_weave": {
            prof: "tailoring", salePrice: 1850,
            names: { es: "Manto de Hilado Arcano", en: "Arcane Spun Mantle" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 12 },
                { id: 219005, names: { es: "Seda tejida de éter", en: "Ether Silk" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 3 }
            ]
        },
        "hood_weaver": {
            prof: "tailoring", salePrice: 2100,
            names: { es: "Caperuza de Tejedor Astral", en: "Astral Weaver Hood" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 14 },
                { id: 219005, names: { es: "Seda tejida de éter", en: "Ether Silk" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 3 }
            ]
        },
        "pants_silk": {
            prof: "tailoring", salePrice: 2300,
            names: { es: "Pantalones de Seda Etérea", en: "Ether Silk Pants" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 15 },
                { id: 219005, names: { es: "Seda tejida de éter", en: "Ether Silk" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 4 }
            ]
        },
        "gloves_cloth": {
            prof: "tailoring", salePrice: 1400,
            names: { es: "Guantes de Tejido Mágico", en: "Mageweave Wraps" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 9 }
            ]
        },
        "belt_cloth": {
            prof: "tailoring", salePrice: 1250,
            names: { es: "Fajín de Seda Celestial", en: "Celestial Silk Cord" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 8 }
            ]
        },
        "boots_cloth": {
            prof: "tailoring", salePrice: 1550,
            names: { es: "Zapatillas de Nube Etérea", en: "Ether Cloud Slippers" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 10 }
            ]
        },
        "bag_magical": {
            prof: "tailoring", salePrice: 4500,
            names: { es: "Bolsa de Tela Algari Espaciosa", en: "Spacious Algari Satchel" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 25 },
                { id: 219005, names: { es: "Seda tejida de éter", en: "Ether Silk" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 8 }
            ]
        },
        "cape_royal_cloth": {
            prof: "tailoring", salePrice: 1600,
            names: { es: "Capa de Tejido Real", en: "Royal Weave Cape" },
            materials: [
                { id: 219001, names: { es: "Fibra crepuscular", en: "Weavecloth" }, source: { es: "👾 Drop", en: "👾 Drop" }, qty: 11 }
            ]
        },

        // --- INGENIERÍA (6 recetas) ---
        "tinker_item": {
            prof: "engineering", salePrice: 750,
            names: { es: "Micro-ajustador Térmico", en: "Scope / Tinker Component" },
            materials: [
                { id: 220001, names: { es: "Tornillo de cobalto", en: "Bolt" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 6 },
                { id: 220005, names: { es: "Muelle de precisión", en: "Spring" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 2 }
            ]
        },
        "goggles_eng": {
            prof: "engineering", salePrice: 2100,
            names: { es: "Gafas de Espectro Óptico", en: "Optical Spectrum Goggles" },
            materials: [
                { id: 220001, names: { es: "Tornillo de cobalto", en: "Bolt" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 10 },
                { id: 220005, names: { es: "Muelle de precisión", en: "Spring" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 4 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 2 }
            ]
        },
        "bomb_thermal": {
            prof: "engineering", salePrice: 420,
            names: { es: "Carga Térmica Volátil", en: "Volatile Thermal Charge" },
            materials: [
                { id: 220001, names: { es: "Tornillo de cobalto", en: "Bolt" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 5 },
                { id: 220005, names: { es: "Muelle de precisión", en: "Spring" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 1 }
            ]
        },
        "wormhole_generator": {
            prof: "engineering", salePrice: 3500,
            names: { es: "Generador de Gusanos: Khaz Algar", en: "Wormhole Generator: Khaz Algar" },
            materials: [
                { id: 220001, names: { es: "Tornillo de cobalto", en: "Bolt" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 15 },
                { id: 220005, names: { es: "Muelle de precisión", en: "Spring" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 6 }
            ]
        },
        "gun_advanced": {
            prof: "engineering", salePrice: 2900,
            names: { es: "Cañón de Riel de Precisión", en: "Precision Rail Rifle" },
            materials: [
                { id: 220001, names: { es: "Tornillo de cobalto", en: "Bolt" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 12 },
                { id: 211200, names: { es: "Barra de titanio", en: "Iron Bar" }, source: { es: "🔨 Fundición", en: "🔨 Smelting" }, qty: 4 }
            ]
        },
        "repair_bot": {
            prof: "engineering", salePrice: 1800,
            names: { es: "Robo-reparador Térmico Mk-V", en: "Thermal Robo-Repair Mk-V" },
            materials: [
                { id: 220001, names: { es: "Tornillo de cobalto", en: "Bolt" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 8 },
                { id: 220005, names: { es: "Muelle de precisión", en: "Spring" }, source: { es: "⚙️ Ingeniería", en: "⚙️ Engineering" }, qty: 3 }
            ]
        }
    };

    let cachedPrices = null;
    let currentRealmRegion = null;
    let currentFilter = "all";
    let craftingSession = [];

    // Cargar configuraciones guardadas
    const savedTheme = localStorage.getItem('wow_theme') || 'goblin';
    document.body.className = `theme-${savedTheme}`;
    document.getElementById('theme-selector').value = savedTheme;

    const savedRealm = localStorage.getItem('wow_realm');
    if (savedRealm) document.getElementById('realm-selector').value = savedRealm;

    const savedRegion = localStorage.getItem('wow_region');
    if (savedRegion) document.getElementById('region-selector').value = savedRegion;

    document.getElementById('theme-selector').addEventListener('change', (e) => {
        const theme = e.target.value;
        document.body.className = `theme-${theme}`;
        localStorage.setItem('wow_theme', theme);
    });

    document.getElementById('realm-selector').addEventListener('change', (e) => {
        localStorage.setItem('wow_realm', e.target.value);
    });

    document.getElementById('region-selector').addEventListener('change', (e) => {
        localStorage.setItem('wow_region', e.target.value);
    });

    // Pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            const target = e.target.getAttribute('data-tab');
            e.target.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    function getFavorites() {
        try { return JSON.parse(localStorage.getItem('wow_favs')) || []; } catch (e) { return []; }
    }

    function toggleFavorite(key) {
        let favs = getFavorites();
        if (favs.includes(key)) { favs = favs.filter(i => i !== key); } else { favs.push(key); }
        localStorage.setItem('wow_favs', JSON.stringify(favs));
        populateRecipes(currentFilter, document.getElementById('recipe-search')?.value || '');
    }

    function getLang() { return document.getElementById('lang-selector')?.value || 'es'; }

    function populateRecipes(filterProf = "all", searchTerm = "") {
        const lang = getLang();
        const selector = document.getElementById('recipe-selector');
        if (!selector) return;
        
        selector.innerHTML = `<option value="">Selecciona una receta del catálogo...</option>`;
        const favs = getFavorites();

        for (const [key, recipe] of Object.entries(recipesDatabase)) {
            if (filterProf === "favorites" && !favs.includes(key)) continue;
            if (filterProf !== "all" && filterProf !== "favorites" && recipe.prof !== filterProf) continue;
            
            const recipeName = recipe.names[lang] || recipe.names['es'];
            if (searchTerm && !recipeName.toLowerCase().includes(searchTerm.toLowerCase())) continue;

            const isFav = favs.includes(key);
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${isFav ? '⭐ ' : ''}[${recipe.prof.toUpperCase()}] ${recipeName}`;
            selector.appendChild(option);
        }
    }

    document.querySelectorAll('.prof-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.prof-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-prof');
            populateRecipes(currentFilter, document.getElementById('recipe-search')?.value || '');
        });
    });

    document.getElementById('recipe-search')?.addEventListener('input', (e) => {
        populateRecipes(currentFilter, e.target.value);
    });

    populateRecipes();

    // RENDERIZAR CALCULADORA
    function renderCalculator(recipe, recipeKey, realm, prices, t, customSalePrice = null) {
        const resultsContainer = document.getElementById('results-container');
        if (!resultsContainer) return;

        const lang = getLang();
        const recipeName = recipe.names[lang] || recipe.names['es'];
        const multiplier = parseInt(document.getElementById('craft-qty-multiplier')?.value || 1);
        const salePrice = (customSalePrice !== null ? customSalePrice : recipe.salePrice) * multiplier;

        let totalCraftCost = 0;
        let materialsHtml = '';
        let missingList = [];
        const favs = getFavorites();
        const isFav = favs.includes(recipeKey);

        recipe.materials.forEach((mat, index) => {
            const unitPrice = prices[mat.id] || 15.00;
            const requiredQty = mat.qty * multiplier;
            const matName = mat.names[lang] || mat.names['es'];
            const sourceText = mat.source[lang] || mat.source['es'];

            const existingInput = document.getElementById(`owned-${index}`);
            const ownedQty = existingInput ? Math.max(0, parseInt(existingInput.value) || 0) : 0;
            const effectiveQty = Math.max(0, requiredQty - ownedQty);

            if (effectiveQty > 0) missingList.push(`${effectiveQty}x ${matName}`);

            const subtotal = unitPrice * effectiveQty;
            totalCraftCost += subtotal;

            materialsHtml += `
                <tr>
                    <td>
                        <div style="font-weight: 600;">${matName}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${sourceText}</div>
                    </td>
                    <td style="text-align: center;">${requiredQty}</td>
                    <td style="text-align: center;">
                        <input type="number" min="0" value="${ownedQty}" class="input-owned" id="owned-${index}" data-index="${index}">
                    </td>
                    <td style="text-align: right;">${unitPrice.toFixed(2)}g</td>
                    <td style="text-align: right; color: var(--accent-gold); font-weight: 600;" id="subtotal-${index}">${subtotal.toFixed(2)}g</td>
                </tr>
            `;
        });

        const ahTax = salePrice * 0.05;
        const netRevenue = salePrice - ahTax;
        const netProfit = netRevenue - totalCraftCost;
        const marginPercent = totalCraftCost > 0 ? (netProfit / totalCraftCost) * 100 : 0;
        const roi = totalCraftCost > 0 ? ((netRevenue / totalCraftCost) * 100).toFixed(1) : 0;

        let statusBadge = netProfit < 0 ? 
            `<span class="badge-thermometer badge-red">🛑 En Pérdida (${marginPercent.toFixed(1)}%)</span>` :
            (marginPercent > 25 ? `<span class="badge-thermometer badge-green">🔥 Altamente Rentable (+${marginPercent.toFixed(1)}%)</span>` :
            `<span class="badge-thermometer badge-yellow">⚠️ Margen Moderado (+${marginPercent.toFixed(1)}%)</span>`);

        resultsContainer.innerHTML = `
            <div class="recipe-card">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <button class="fav-btn ${isFav ? 'active' : ''}" id="toggle-fav-btn" title="Favorita">⭐</button>
                        <div>
                            <h2 style="margin: 0; color: #fff; font-size: 1.4rem;">${recipeName} (x${multiplier})</h2>
                            ${statusBadge}
                        </div>
                    </div>
                    <div>
                        <label style="font-size: 0.85em; color: var(--text-muted); font-weight: 600;">${t.salePriceLabel}</label>
                        <input type="number" id="custom-sale-price" class="input-price" value="${salePrice}">
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>${t.tableMaterial}</th>
                            <th style="text-align: center;">${t.tableQty}</th>
                            <th style="text-align: center;">${t.tableOwned}</th>
                            <th style="text-align: right;">${t.tablePrice}</th>
                            <th style="text-align: right;">${t.tableSubtotal}</th>
                        </tr>
                    </thead>
                    <tbody>${materialsHtml}</tbody>
                </table>

                <div class="summary-grid">
                    <div class="summary-box"><span>${t.costMaterials}</span><strong style="color: var(--red);">${totalCraftCost.toFixed(2)}g</strong></div>
                    <div class="summary-box"><span>${t.netSale}</span><strong style="color: #fff;">${netRevenue.toFixed(2)}g</strong></div>
                    <div class="summary-box"><span>${t.netProfit}</span><strong style="color: ${netProfit >= 0 ? 'var(--green)' : 'var(--red)'};">${netProfit.toFixed(2)}g</strong></div>
                    <div class="summary-box"><span>Retorno (ROI)</span><strong style="color: var(--accent-gold);">${roi}%</strong></div>
                </div>

                <div class="action-row-buttons">
                    <button id="btn-copy-shopping" class="secondary-btn">📋 Copiar Lista de Compras</button>
                    <button id="btn-add-session" class="secondary-btn">➕ Sumar a Sesión de Crafteo</button>
                </div>
            </div>
        `;

        document.getElementById('toggle-fav-btn')?.addEventListener('click', () => {
            toggleFavorite(recipeKey);
            renderCalculator(recipe, recipeKey, realm, prices, t, customSalePrice);
        });

        document.getElementById('btn-copy-shopping')?.addEventListener('click', () => {
            navigator.clipboard.writeText(missingList.length > 0 ? missingList.join(', ') : '¡Tienes todos los materiales!');
            alert(t.copiedText);
        });

        document.getElementById('btn-add-session')?.addEventListener('click', () => {
            craftingSession.push({ name: recipeName, qty: multiplier, cost: totalCraftCost, profit: netProfit });
            updateSessionUI();
            alert(t.addedSession);
        });
    }

    function updateSessionUI() {
        const countEl = document.getElementById('session-count');
        const costEl = document.getElementById('session-cost');
        const profitEl = document.getElementById('session-profit');
        const listEl = document.getElementById('session-list');

        let totalCost = 0, totalProfit = 0;
        let html = '<table><thead><tr><th>Receta</th><th style="text-align:center;">Lotes</th><th style="text-align:right;">Costo</th><th style="text-align:right;">Ganancia Est.</th></tr></thead><tbody>';

        craftingSession.forEach(item => {
            totalCost += item.cost;
            totalProfit += item.profit;
            html += `<tr><td>${item.name}</td><td style="text-align:center;">x${item.qty}</td><td style="text-align:right; color:var(--red);">${item.cost.toFixed(2)}g</td><td style="text-align:right; color:var(--green);">${item.profit.toFixed(2)}g</td></tr>`;
        });

        html += '</tbody></table>';
        if (countEl) countEl.textContent = craftingSession.length;
        if (costEl) costEl.textContent = `${totalCost.toFixed(2)}g`;
        if (profitEl) profitEl.textContent = `${totalProfit.toFixed(2)}g`;
        if (listEl) listEl.innerHTML = craftingSession.length > 0 ? html : '<p style="color:var(--text-muted); text-align:center;">No hay crafteos registrados aún en esta sesión.</p>';
    }

    document.getElementById('btn-clear-session')?.addEventListener('click', () => {
        craftingSession = [];
        updateSessionUI();
    });

    // PRESUPUESTO
    document.getElementById('btn-run-budget')?.addEventListener('click', async () => {
        const realm = document.getElementById('realm-selector').value;
        const budget = parseFloat(document.getElementById('budget-input').value) || 0;
        const resultsEl = document.getElementById('budget-results');

        if (!realm) return alert('Selecciona un servidor primero.');
        resultsEl.innerHTML = '<p style="color: var(--accent-gold); text-align: center;">Analizando recetas según tu presupuesto...</p>';

        try {
            if (!cachedPrices || currentRealmRegion !== realm) {
                const res = await fetch(`/api/prices?realm=${realm}`);
                const data = await res.json();
                cachedPrices = data.prices;
                currentRealmRegion = realm;
            }

            let html = '<table><thead><tr><th>Receta</th><th style="text-align:right;">Costo Crafteo</th><th style="text-align:right;">Ganancia Est.</th></tr></thead><tbody>';
            const lang = getLang();
            const favs = getFavorites();
            let matched = 0;

            for (const [key, recipe] of Object.entries(recipesDatabase)) {
                let cost = 0;
                recipe.materials.forEach(m => cost += (cachedPrices[m.id] || 15) * m.qty);
                const netRev = recipe.salePrice * 0.95;
                const profit = netRev - cost;

                if (cost <= budget && profit > 0) {
                    matched++;
                    const isFav = favs.includes(key);
                    html += `<tr><td>${isFav ? '⭐ ' : ''}<strong>${recipe.names[lang] || recipe.names.es}</strong></td><td style="text-align:right;">${cost.toFixed(2)}g</td><td style="text-align:right; color:var(--green); font-weight:700;">+${profit.toFixed(2)}g</td></tr>`;
                }
            }
            html += '</tbody></table>';
            resultsEl.innerHTML = matched > 0 ? html : '<p style="color: var(--text-muted); text-align: center;">No se encontraron recetas rentables con ese presupuesto.</p>';
        } catch (err) {
            resultsEl.innerHTML = '<p style="color: var(--red); text-align: center;">Error al conectar con el servidor.</p>';
        }
    });

    // DETECTOR DE FLIPS
    document.getElementById('btn-run-flips')?.addEventListener('click', async () => {
        const realm = document.getElementById('realm-selector').value;
        const resultsEl = document.getElementById('flips-results');

        if (!realm) return alert('Selecciona un servidor primero.');
        resultsEl.innerHTML = '<p style="color: var(--accent-gold); text-align: center;">Escaneando el mercado en busca de oportunidades de arbitraje y flips...</p>';

        try {
            if (!cachedPrices || currentRealmRegion !== realm) {
                const res = await fetch(`/api/prices?realm=${realm}`);
                const data = await res.json();
                cachedPrices = data.prices;
                currentRealmRegion = realm;
            }

            const flipRecipes = [
                { key: "alloy_Bismuth", name: "Lingote de Bismuto Enriquecido (Aleación)" },
                { key: "cloth_bolt", name: "Rollo de Tela Crepuscular" },
                { key: "armor_kit", name: "Kit de Armadura Reforzado" }
            ];

            let html = '<table><thead><tr><th>Operación de Flip / Transformación</th><th style="text-align:right;">Costo</th><th style="text-align:right;">Ganancia Limpia</th></tr></thead><tbody>';
            flipRecipes.forEach(flip => {
                const rec = recipesDatabase[flip.key];
                if (!rec) return;
                let cost = 0;
                rec.materials.forEach(m => cost += (cachedPrices[m.id] || 15) * m.qty);
                const profit = (rec.salePrice * 0.95) - cost;
                html += `<tr><td><strong>${flip.name}</strong></td><td style="text-align:right; color: var(--red);">${cost.toFixed(2)}g</td><td style="text-align:right; color: ${profit >= 0 ? 'var(--green)' : 'var(--red)'}; font-weight: 700;">${profit >= 0 ? '+' : ''}${profit.toFixed(2)}g</td></tr>`;
            });
            html += '</tbody></table>';
            resultsEl.innerHTML = html;
        } catch (err) {
            resultsEl.innerHTML = '<p style="color: var(--red); text-align: center;">Error al escanear los precios.</p>';
        }
    });

    // BOTÓN PRINCIPAL
    document.getElementById('calculate-btn')?.addEventListener('click', async () => {
        const realm = document.getElementById('realm-selector').value;
        const recipeKey = document.getElementById('recipe-selector').value;
        const t = translations[getLang()] || translations.es;

        if (!realm) return alert(t.selectRealmAlert);
        if (!recipeKey) return alert(t.selectRecipeAlert);

        try {
            if (!cachedPrices || currentRealmRegion !== realm) {
                const res = await fetch(`/api/prices?realm=${realm}`);
                const data = await res.json();
                cachedPrices = data.prices;
                currentRealmRegion = realm;
            }

            renderCalculator(recipesDatabase[recipeKey], recipeKey, realm, cachedPrices, t);
        } catch (err) {
            document.getElementById('results-container').innerHTML = '<p style="color: var(--red); text-align: center;">No se pudo conectar con el servidor.</p>';
        }
    });
});
