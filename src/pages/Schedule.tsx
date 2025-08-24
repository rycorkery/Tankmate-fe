import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateCard, TankmateCardContent, TankmateCardHeader, TankmateCardTitle } from '@/components/custom/TankmateCard'
import { ButtonVariant } from '@/lib/constants'

export function Schedule() {
  // Mock data - in real app this would come from API
  const todayTasks = [
    { id: '1', task: 'Test water parameters', tank: 'Community Tank', time: '9:00 AM', completed: false },
    { id: '2', task: 'Feed fish', tank: 'Reef Tank', time: '6:00 PM', completed: true },
  ]

  const upcomingTasks = [
    { id: '3', task: 'Water change (25%)', tank: 'Community Tank', date: 'Tomorrow', completed: false },
    { id: '4', task: 'Clean filter', tank: 'Reef Tank', date: 'Friday', completed: false },
    { id: '5', task: 'Algae scraping', tank: 'Community Tank', date: 'Sunday', completed: false },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Schedule</h1>
          <p className="text-slate-600">Stay on top of your tank maintenance</p>
        </div>
        <TankmateButton variant={ButtonVariant.DEFAULT}>
          Add Task
        </TankmateButton>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Tasks */}
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Today's Tasks</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            {todayTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No tasks scheduled for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="w-4 h-4 text-brand-ocean rounded"
                        readOnly
                      />
                      <div className={task.completed ? 'line-through text-slate-400' : ''}>
                        <div className="font-medium">{task.task}</div>
                        <div className="text-sm text-slate-600">{task.tank} • {task.time}</div>
                      </div>
                    </div>
                    {!task.completed && (
                      <TankmateButton variant={ButtonVariant.OUTLINE} size="sm">
                        Complete
                      </TankmateButton>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TankmateCardContent>
        </TankmateCard>

        {/* Upcoming Tasks */}
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Upcoming Tasks</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            {upcomingTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No upcoming tasks</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{task.task}</div>
                      <div className="text-sm text-slate-600">{task.tank} • {task.date}</div>
                    </div>
                    <TankmateButton variant={ButtonVariant.GHOST} size="sm">
                      Edit
                    </TankmateButton>
                  </div>
                ))}
              </div>
            )}
          </TankmateCardContent>
        </TankmateCard>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>This Week</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="text-3xl font-bold text-brand-ocean mb-2">12</div>
            <p className="text-sm text-slate-600">Tasks completed</p>
          </TankmateCardContent>
        </TankmateCard>

        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Overdue</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">2</div>
            <p className="text-sm text-slate-600">Tasks need attention</p>
          </TankmateCardContent>
        </TankmateCard>

        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Streak</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="text-3xl font-bold text-brand-teal mb-2">7</div>
            <p className="text-sm text-slate-600">Days on track</p>
          </TankmateCardContent>
        </TankmateCard>
      </div>
    </div>
  )
}