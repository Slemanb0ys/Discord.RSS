const Base = require('./Base.js')
const Supporter = require('./Supporter.js')
const ProfileModel = require('../../models/Profile.js')
const getConfig = require('../../config.js').get

class Profile extends Base {
  /**
   * @param {import('mongoose').Model|Object<string, any>} data - Data
   * @param {string} data._id - Guild ID
   * @param {string} data.name - Guild name
   * @param {string} data.dateFormat - Date format for date placeholders
   * @param {string} data.dateLanguage - Date language for date placeholders
   * @param {string} data.timezone - Date timezone for date placeholders
   * @param {string} data.prefix - Prefix for commands
   * @param {string} data.locale - Locale for commands
   */
  constructor (data, _saved) {
    super(data, _saved)

    if (!this._id) {
      throw new Error('Undefined _id')
    }

    /**
     * The guild's name
     * @type {string}
     */
    this.name = this.getField('name')
    if (!this.name) {
      throw new Error('Undefined name')
    }

    /**
     * Date format for date placeholders
     * @type {string}
     */
    this.dateFormat = this.getField('dateFormat')

    /**
     * Date language for date placeholders
     * @type {string}
     */
    this.dateLanguage = this.getField('dateLanguage')

    /**
     * Date timezone for date placeholders
     * @type {string}
     */
    this.timezone = this.getField('timezone')

    /**
     * Prefix for commands
     * @type {string}
     */
    this.prefix = this.getField('prefix')

    /**
     * Locale for commands
     * @type {string}
     */
    this.locale = this.getField('locale')

    /**
     * User IDs to send alerts to
     * @type {string[]}
     */
    this.alert = this.getField('alert', [])
  }

  /**
   * Getter for this._id since _id and id should be
   * the same.
   * @returns {string}
   */
  get id () {
    return this.getField('_id')
  }

  /**
   * Returns the feed limit of this server
   * @returns {number}
   */
  static async getFeedLimit (guildID) {
    const supporter = await Supporter.getValidSupporterOfGuild(guildID)
    const config = getConfig()
    if (supporter) {
      return supporter.getMaxFeeds()
    } else {
      return config.feeds.max
    }
  }

  toObject () {
    return {
      _id: this._id,
      name: this.name,
      dateFormat: this.dateFormat,
      dateLanguage: this.dateLanguage,
      timezone: this.timezone,
      prefix: this.prefix,
      locale: this.locale,
      alert: this.alert
    }
  }

  static get Model () {
    return ProfileModel.Model
  }
}

module.exports = Profile