package rent.common.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Оплата ЛС
 */
@Entity
@Table(name = AccountPaymentEntity.TABLE_NAME, indexes = {
        @Index(columnList = AccountPaymentEntity.Columns.ID),
        @Index(columnList = AccountPaymentEntity.Columns.ACCOUNT_SERVICE),
        @Index(columnList = AccountPaymentEntity.Columns.PERIOD),
})
public class AccountPaymentEntity extends AbstractEntity {
    public static final String TABLE_NAME = "accounts_payments";

    public interface Columns extends AbstractEntity.Columns {
        String ACCOUNT_SERVICE = "account_service_id";
        String PERIOD = "period";
        String VALUE = "value";
    }

    /**
     * услуга лс
     */
    @JoinColumn(name = Columns.ACCOUNT_SERVICE)
    @ManyToOne(fetch = FetchType.LAZY)
    private AccountServiceEntity accountService;

    /**
     * период
     */
    @Column(name = Columns.PERIOD)
    private Date period;

    /**
     * сумма
     */
    @Column(name = Columns.VALUE)
    private Double value;

    public AccountServiceEntity getAccountService() {
        return accountService;
    }

    public void setAccountService(AccountServiceEntity accountService) {
        this.accountService = accountService;
    }

    public Date getPeriod() {
        return period;
    }

    public void setPeriod(Date period) {
        this.period = period;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
