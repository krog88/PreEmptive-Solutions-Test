SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Mike F.
-- Create date: 2012-02-25
-- Description:	Get total revenue by person-product for year passed in
-- =============================================
CREATE PROCEDURE spTotalRevenueByPersonProduct 
	@year int = null
AS
BEGIN
	SET NOCOUNT ON;

    -- Use current year if no year was passed in
    if @year is null set @year = datepart(year,getdate())

    select e.emp_fname
        , p.name
        , cast(sum(p.unit_price * soi.quantity) as int) as revenue
    from sales_order so
    left outer join sales_order_items soi
        on so.id = soi.id
    left outer join product p
        on soi.prod_id = p.id
    left outer join employee e
        on so.sales_rep = e.emp_id
    --where so.order_date between '2000-01-01 00:00:00.000' and '2000-12-31 23:59:59.999'
    where datepart(year,so.order_date) = @year
    group by e.emp_fname
        , p.name
    order by e.emp_fname
        , p.name

	
END
GO
