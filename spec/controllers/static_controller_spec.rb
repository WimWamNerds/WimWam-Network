# frozen_string_literal: true

require "rails_helper"

describe StaticController, type: :controller do
  describe "#about" do
    subject { get :about }
    
    before(:each) {
      FactoryBot.create(:user, { confirmed_at: Time.now, answered_count: 1, asked_count: 1 })
      FactoryBot.create(:user, { permanently_banned: true })
      FactoryBot.create(:user, { banned_until: Time.now + 10.days })
      FactoryBot.create(:user, { confirmed_at: Time.now })
    }

    it "shows the correct user count" do
      subject
      expect(assigns(:users)).to eq(1)
    end
  end
end