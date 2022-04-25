class Item {
	constructor(name, sellIn, quality) {
		this.name = name
		this.sellIn = sellIn
		this.quality = quality
	}
}

class Shop {
	constructor(items = []) {
		this.items = items
	}
	updateQuality() {
		let updatedItems = []

		this.items.reduce((_, currentValue) => {
			switch (currentValue.name) {
				case 'Aged Brie':
					currentValue.sellIn <= 0 ? (currentValue.quality += 2) : (currentValue.quality += 1)
					currentValue.quality >= 50 ? (currentValue.quality = 50) : currentValue.quality
					currentValue.quality <= 0 ? (currentValue.quality = 0) : currentValue.quality
					currentValue.sellIn--
					break

				case 'Backstage passes to a TAFKAL80ETC concert':
					currentValue.sellIn >= 11 ? (currentValue.quality += 1) : (currentValue.quality += 2)
					currentValue.sellIn >= 6 ? currentValue.quality : (currentValue.quality += 1)
					currentValue.quality <= 0 ? (currentValue.quality = 0) : currentValue.quality
					currentValue.quality >= 50 ? (currentValue.quality = 50) : currentValue.quality
					currentValue.sellIn <= 0 ? (currentValue.quality = 0) : currentValue.quality
					currentValue.sellIn--
					break

				case 'Sulfuras, Hand of Ragnaros':
					break

				case 'Conjured':
					currentValue.sellIn <= 0 ? (currentValue.quality -= 4) : (currentValue.quality -= 2)
					currentValue.quality >= 50 ? (currentValue.quality = 50) : currentValue.quality
					currentValue.quality <= 0 ? (currentValue.quality = 0) : currentValue.quality
					currentValue.sellIn--
					break

				default:
					currentValue.sellIn <= 0 ? (currentValue.quality -= 2) : (currentValue.quality -= 1)
					currentValue.quality >= 50 ? (currentValue.quality = 50) : currentValue.quality
					currentValue.quality <= 0 ? (currentValue.quality = 0) : currentValue.quality
					currentValue.sellIn--
			}

			updatedItems.push(currentValue)
		}, [])

		return updatedItems
	}
}

module.exports = {
	Item,
	Shop
}
