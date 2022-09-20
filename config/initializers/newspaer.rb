Rails.configuration.to_prepare do
  Newspaper.subscribe(:event_create, EventOrganizerWatcher.new)
  Newspaper.subscribe(:answer_create, AnswerNotifier.new)
  Newspaper.subscribe(:answer_create, NotifierToWatchingUser.new)

  sad_streak_updater = SadStreakUpdater.new
  Newspaper.subscribe(:report_create, sad_streak_updater)
  Newspaper.subscribe(:report_update, sad_streak_updater)
  Newspaper.subscribe(:report_destroy, sad_streak_updater)

  learning_cache_destroyer = LearningCacheDestroyer.new
  Newspaper.subscribe(:learning_create, learning_cache_destroyer)
  Newspaper.subscribe(:learning_destroy, learning_cache_destroyer)

  answer_cache_destroyer = AnswerCacheDestroyer.new
  Newspaper.subscribe(:answer_save, answer_cache_destroyer)
  Newspaper.subscribe(:answer_update, answer_cache_destroyer)
  Newspaper.subscribe(:answer_destroy, answer_cache_destroyer)
end
