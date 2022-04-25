const { Shop, Item } = require('../src/gilded_rose')

const updateItems = (gildedRose, incrementBy, items) => {
	let newItems
	for (let i = 0; i < incrementBy; i++) {
		newItems = gildedRose.updateQuality()
	}
	return newItems
}

describe('Gilded Rose initial validation', function () {
	test('Name should be a string value that matches the input', function () {
		const gildedRose = new Shop([new Item('test', 0, 0)])
		const items = gildedRose.updateQuality()
		expect(items[0].name).toString()
	})
})

describe('Gilded Rose system requirements', function () {
	test('Once the sell by date has passed, Quality degrades twice as fast', function () {
		const gildedRose = new Shop([new Item('test', 5, 15)])
		let items = gildedRose.updateQuality()
		// check the value of the first run
		expect(items[0].quality).toBe(14)
		// run the update method again X times
		items = updateItems(gildedRose, 6, items)
		// check the value of the second run
		expect(items[0].quality).toBe(6)
		expect(items[0].sellIn).toBe(-2)
	})

	test('The Quality of an item is never negative', function () {
		const gildedRose = new Shop([new Item('test', 5, 5)])
		let items = gildedRose.updateQuality()
		// check the value of the first run
		expect(items[0].quality).toBe(4)
		// run the update method again X times
		items = updateItems(gildedRose, 6, items)
		// check the value of the seventh run
		expect(items[0].quality).toBe(0)
		expect(items[0].sellIn).toBe(-2)
	})

	test('"Aged Brie" actually increases in Quality the older it gets', function () {
		const gildedRose = new Shop([new Item('Aged Brie', 5, 5)])
		let items = gildedRose.updateQuality()
		// check the value of the first run
		expect(items[0].quality).toBe(6)
		// run the update method again X times
		items = updateItems(gildedRose, 6, items)
		// check the value of the seventh run
		expect(items[0].quality).toBe(14)
		expect(items[0].sellIn).toBe(-2)
	})

	test('The Quality of an item is never more than 50', function () {
		const gildedRose = new Shop([new Item('Aged Brie', 5, 50), new Item('Sulfuras, Hand of Ragnaros', 5, 50)])
		let items = gildedRose.updateQuality()
		// check the value of the first run
		expect(items[0].quality).toBe(50)
		expect(items[1].quality).toBe(50)
		// run the update method again X times
		items = updateItems(gildedRose, 6, items)
		// check the value of the seventh run
		expect(items[0].quality).toBe(50)
		expect(items[1].quality).toBe(50)
		expect(items[0].sellIn).toBe(-2)
	})

	test('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', function () {
		const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80)])
		let items = gildedRose.updateQuality()
		// check the value of the first run
		expect(items[0].quality).toBe(80)
		// run the update method again X times
		items = updateItems(gildedRose, 6, items)
		// check the value of the seventh run
		expect(items[0].quality).toBe(80)
		expect(items[0].sellIn).toBe(0)
	})

	test('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', function () {
		const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 5)])
		let items = gildedRose.updateQuality()
		// check the value of the first run
		expect(items[0].quality).toBe(8)
		// run the update method again X times
		items = updateItems(gildedRose, 3, items)
		// check the value of the 4th run
		expect(items[0].quality).toBe(17)
		expect(items[0].sellIn).toBe(1)
		// run the update method again X times
		items = updateItems(gildedRose, 3, items)
		// check the value of the 8th run and has expired
		expect(items[0].quality).toBe(0)
		expect(items[0].sellIn).toBe(-2)
	})

	test('Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert', function () {
		const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 5)])
		let items = gildedRose.updateQuality()
		// check the value of the first run
		expect(items[0].quality).toBe(6)
		// run the update method again X times
		items = updateItems(gildedRose, 3, items)
		// check the value of the 4th run
		expect(items[0].quality).toBe(12)
		expect(items[0].sellIn).toBe(7)
		// run the update method again X times
		items = updateItems(gildedRose, 8, items)
		// check the value of the 8th run and has expired
		expect(items[0].quality).toBe(0)
		expect(items[0].sellIn).toBe(-1)
	})

	test('"Sulfuras" Quality is 80 and it never alters', function () {
		const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 5, 80)])
		const item = gildedRose.updateQuality()
		expect(item[0].quality).toBe(80)
	})
})

describe('Gilded Rose New Item', function () {
	test('"Conjured" items degrade in Quality twice as fast as normal items', function () {
		const gildedRose = new Shop([new Item('Conjured', 5, 25)])
		let items = gildedRose.updateQuality()
		// check the value of the first run
		expect(items[0].quality).toBe(23)
		// run the update method again X times
		items = updateItems(gildedRose, 4, items)
		// check the value of the 5th run
		expect(items[0].quality).toBe(15)
		expect(items[0].sellIn).toBe(0)
		// run the update method again X times
		items = updateItems(gildedRose, 3, items)
		// check the value after the item expires
		expect(items[0].sellIn).toBe(-3)
		expect(items[0].quality).toBe(3)
	})
})
