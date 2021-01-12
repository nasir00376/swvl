export interface DomainEvent {
    eventType: string;
    text: string;
    notificationType: 'sms' | 'push'
}