package rent.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

/**
 * Вид расчета
 */
@Entity
@Table(name = CalculationTypeEntity.TABLE_NAME, indexes = {
        @Index(columnList = CalculationTypeEntity.Columns.ID),
        @Index(columnList = CalculationTypeEntity.Columns.CODE),
        @Index(columnList = CalculationTypeEntity.Columns.NAME)
})
public class CalculationTypeEntity extends AbstractEntity {
    public static final String TABLE_NAME = "const_calculation_types";

    public interface Columns extends AbstractEntity.Columns {
        String CODE = "code";
        String NAME = "name";
        String NAME_ORIGIN = "name_origin";
    }

    /**
     * код вида расчета
     */
    @Column(name = Columns.CODE)
    private String code;

    /**
     * имя вида расчета
     */
    @Column(name = Columns.NAME)
    private String name;

    /**
     * Предустановленное исходное название
     */
    @Column(name = Columns.NAME_ORIGIN)
    private String nameOrigin;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameOrigin() {
        return nameOrigin;
    }

    public void setNameOrigin(String nameOrigin) {
        this.nameOrigin = nameOrigin;
    }
}