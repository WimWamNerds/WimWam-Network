require 'rails_helper'

RSpec.describe Character, type: :model do
  subject(:character) { build(:character) }

  context 'with valid attributes' do
    it { is_expected.to be_valid }

    it 'is valid with integers 0-8 for alignment' do
      character.alignment = 0
      expect(character).to be_valid
    end
  end

  context 'with invalid length attributes' do
    it 'is not valid with portrait credit artist of over 50 characters' do
      character.portrait_credit_artist = Faker::Internet.username(specifier: 51..51)
      expect(character).not_to be_valid
    end

    it 'is not valid with background of over 50 characters' do
      character.background = Faker::Internet.username(specifier: 51..51)
      expect(character).not_to be_valid
    end

    it 'is not valid with race of over 30 characters' do
      character.race = Faker::Internet.username(specifier: 31)
      expect(character).not_to be_valid
    end

    it 'is not valid with sex of over 20 characters' do
      character.sex = Faker::Internet.username(specifier: 21)
      expect(character).not_to be_valid
    end

    it 'is not valid with gender of over 30 characters' do
      character.gender = Faker::Internet.username(specifier: 31)
      expect(character).not_to be_valid
    end

    it 'is not valid with sexual orientation of over 30 characters' do
      character.sexual_orientation = Faker::Internet.username(specifier: 31)
      expect(character).not_to be_valid
    end
  end

  context 'with nil attributes' do
    it 'is valid with no character_portrait_URL' do
      character.character_portrait_URL = nil
      expect(character).to be_valid
    end

    it 'is valid with no portrait_credit_URL' do
      character.portrait_credit_URL = nil
      expect(character).to be_valid
    end

    it 'is not valid with no character_name' do
      character.character_name = nil
      expect(character).not_to be_valid
    end

    it 'is not valid with no background' do
      character.background = nil
      expect(character).not_to be_valid
    end

    it 'is not valid with no alignment' do
      character.alignment = nil
      expect(character).not_to be_valid
    end

    it 'is not valid with no race' do
      character.race = nil
      expect(character).not_to be_valid
    end

    it 'is not valid with no sex' do
      character.sex = nil
      expect(character).not_to be_valid
    end
  end

  context 'with obscene text' do
    it 'is not valid with obscene text in display_name' do
      character.character_name = 'Mister.Shitface'
      expect(character).not_to be_valid
    end

    it 'is not valid with obscene text in background' do
      character.background = 'fucker'
      expect(character).not_to be_valid
    end

    it 'is not valid with obscene text in race' do
      character.race = 'tits'
      expect(character).not_to be_valid
    end

    it 'is not valid with obscene text in sex' do
      character.sex = 'bitch'
      expect(character).not_to be_valid
    end

    it 'is not valid with obscene text in gender' do
      character.gender = 'biatch'
      expect(character).not_to be_valid
    end

    it 'is not valid with obscene text in sexual_orientation' do
      character.sexual_orientation = 'faggot'
      expect(character).not_to be_valid
    end
  end

  context 'with other invalid attributes' do
    it 'is not valid with invalid alignment' do
      expect { character.alignment = 'True Evil' }.to raise_error(ArgumentError)
      expect { character.alignment = '10' }.to raise_error(ArgumentError)
    end

    it 'is not valid with invalid http portrait_credit_URL' do
      character.portrait_credit_URL = 'twitter.com/dungeonMaster'
      expect(character).not_to be_valid
    end

    it 'is not valid with invalid http in character_portrait_URL' do
      character.character_portrait_URL = 'twitter.com/dungeonMaster'
      expect(character).not_to be_valid
    end
  end

  describe '#total_levels' do
    context 'with 1 class_and_levels record' do
      it 'returns that one character_level' do
        class_and_level = create(:class_and_level, character: character, character_level: 10)
        expect(character.total_levels).to eq(class_and_level.character_level)
      end
    end

    context 'with multiple class_and_levels records' do
      it 'returns sum of character_levels' do
        create(:class_and_level, character: character, character_level: 10)
        create(:class_and_level, character: character, character_level: 4)
        create(:class_and_level, character: character, character_level: 2)
        expect(character.total_levels).to eq((10 + 4 + 2))
      end
    end
  end

  describe '#classes_string' do
    it 'returns comma separated list with and if 3+ elements' do
      create(:class_and_level, character: character,
        character_class: 'Artificer', character_subclass: 'Armorer', character_level: 10)
      create(:class_and_level, character: character,
        character_class: 'Blood Hunter', character_subclass: 'Mutant', character_level: 1)
      create(:class_and_level, character: character,
        character_class: 'Sage', character_subclass: 'Abnormal', character_level: 9)

      expect(character.classes_string).to eq('Armorer Artificer 10, Abnormal Sage 9, and Mutant Blood Hunter 1')
    end

    it 'returns simple string if 1 element' do
      create(:class_and_level, character: character,
        character_class: 'Sage', character_subclass: 'Abnormal', character_level: 9)

      expect(character.classes_string).to eq('Abnormal Sage 9')
    end

    it 'returns string with and if 2 elements' do
      create(:class_and_level, character: character,
        character_class: 'Artificer', character_subclass: 'Armorer', character_level: 10)
      create(:class_and_level, character: character,
        character_class: 'Sage', character_subclass: 'Abnormal', character_level: 9)

      expect(character.classes_string).to eq('Armorer Artificer 10 and Abnormal Sage 9')
    end
  end
end
