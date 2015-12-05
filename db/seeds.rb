# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# create some categories as default

if Category.count == 0
  Category.create!(name: "Terror")
  Category.create!(name: "Romance")
  Category.create!(name: "Adventure")
end
